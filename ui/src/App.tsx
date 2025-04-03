import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:4000/v1/healthcheck")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <p className="text-cyan-300">{data}</p>
        </div>
    );
}

export default App;
