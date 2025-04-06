import { useState, useEffect } from "react";
import axios from "axios";

function Healthcheck() {
    const [data, setData] = useState<{ status: string; system_info: { [key: string]: string } } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const columns = ["status", "environment", "version"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/v1/healthcheck");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load healthcheck data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!data) return <div className="text-center py-4">No data available</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full max-w-4xl mx-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="px-4 py-2 border border-gray-200 text-left capitalize text-green-400"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        {columns.map((column) => (
                            <td
                                key={column}
                                className="px-4 py-2 border border-gray-200 text-black"
                            >
                                {column === "status"
                                ? data[column] || "N/A"
                                : (data.system_info && data.system_info[column]) || "N/A"}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Healthcheck;
