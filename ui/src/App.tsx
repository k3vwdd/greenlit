import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Healthcheck from "./components/Healthcheck";
import CreateMovie from "./components/CreateMovie";

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
                    path="/createmovies"
                    element={
                        <div className="text-gray-100">
                        <CreateMovie />
                        </div>
                    }
                    />
                    <Route
                        path="/healthcheck"
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
