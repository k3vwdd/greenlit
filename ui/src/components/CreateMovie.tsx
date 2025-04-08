import { useState } from "react";
import axios from "axios";


interface Errors {
  title?: string;
  year?: string;
  runtime?: string;
  genres?: string;
}

interface FormData {
    title: string;
    year?: number;
    runtime: string;
    genres: string;
}

function CreateMovie() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        year: undefined,
        runtime: "",
        genres: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "year") {
            let yearValue: number | undefined;
            if (value == "") {
                yearValue = undefined;
            } else {
                yearValue = Number(value)
            }
            setFormData({ ...formData, [name]: yearValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (errors) setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Errors = {};

        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.year || isNaN(Number(formData.year)))
            newErrors.year = "Year must be a number";
        if (!formData.runtime) newErrors.runtime = "Runtime minutes is required: '100 mins'";
        if (formData.genres.length === 0)
            newErrors.genres = "At least one genre is required";

        const genresArray = formData.genres
                                    .split(",")
                                    .map((genre) => genre.trim())
                                    .filter((genre) => genre !== "");
        const formDataToSubmit = {
            ...formData,
            genres: genresArray,
        };

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post("http://localhost:4000/v1/movies", formDataToSubmit);
            console.log("Movie posted:", response.data);
            setSuccessMessage("Movie posted successfully")
        } catch (error) {
            console.error("Error posting movie:", error);
            setErrorMessage("Unable to post movie, an error occurred")
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Create a Movie
                </h2>

                {successMessage && (
                    <p className="text-green-500 text-center">{successMessage}</p>
                )}

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                <div className="flex flex-col gap-2">
                    <label className="text-black text-sm font-medium">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">
                            {errors.title}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-black text-sm font-medium">
                        Year:
                    </label>
                    <input
                        type="bday-year"
                        name="year"
                        value={formData.year ?? ""}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.year && (
                        <span className="text-red-500 text-sm">
                            {errors.year}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-black text-sm font-medium">
                        Runtime (minutes):
                    </label>
                    <input
                        type="text"
                        name="runtime"
                        value={formData.runtime}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.runtime && (
                        <span className="text-red-500 text-sm">
                            {errors.runtime}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-black text-sm font-medium">
                        Genres:
                    </label>
                    <input
                        type="text"
                        name="genres"
                        value={formData.genres}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {errors.genres && (
                        <span className="text-red-500 text-sm">
                            {errors.genres}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`p-3 text-white rounded-md transition-colors ${
                        isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default CreateMovie;
