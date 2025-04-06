import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Healthcheck from "./components/Healthcheck";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <div className="text-gray-100">
                                <Home />
                            </div>
                        }
                    />
                    <Route
                        path="/v1/healthcheck"
                        element={
                            <div className="text-gray-100">
                                <Healthcheck />
                            </div>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
