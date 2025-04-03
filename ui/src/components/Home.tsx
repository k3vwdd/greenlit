import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <nav className="mt-4">
                <Link
                    to="/v1/healthcheck"
                    className="text-blue-500 hover:text-blue-700 underline"
                >
                    Check API Health Status
                </Link>
            </nav>
        </div>
    );
}

export default Home;
