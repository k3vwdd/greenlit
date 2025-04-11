import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table";

interface Movie {
  title: string;
  genres: string[];
}

interface MovieResponse {
  movies: Movie[];
  filters: {
    page: number;
    page_size: number;
    sort: string;
    sort_safe_list: string[];
  };
}

const fetchAllMovies = async (): Promise<MovieResponse> => {
    const response = await axios.get("http://localhost:4000/v1/movies");
    return response.data;
};

const columns: ColumnDef<Movie>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
];


function AllMovies() {
    const { data, error, isPending } = useQuery({
        queryKey: ["movies"],
        queryFn: fetchAllMovies,
    });

    const tableData = data?.movies ?? [];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isPending) return <div className="text-center py-4">Loading...</div>;
    if (error)
        return (
            <div className="text-red-500 text-center py-4">
                {(error as Error).message}
            </div>
        );
    if (!data) return <div className="text-center py-4">No data available</div>;


    return (
        <div>
            <h1 className="text-black">Movies</h1>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="text-black">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="text-black">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {cell.getValue() as string}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllMovies;
