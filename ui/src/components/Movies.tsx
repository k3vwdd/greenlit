import { useState, useEffect } from "react";
import axios from "axios";

function Movies() {
    const [data, setData] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:4000/v1/movies")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <pre className="text-cyan-300">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Movies;


