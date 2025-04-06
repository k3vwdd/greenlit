import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-green-500 font-bold text-xl">
                    <Link to="/">Greenlit</Link>
                </div>
                <div className="space-x-4">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Home
                    </Link>
                    <Link to="/v1/healthcheck"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Health Check
                    </Link>
                    {/* Add more navigation links here */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
