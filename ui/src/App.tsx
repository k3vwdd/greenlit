import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Healthcheck from "./components/Healthcheck";
import CreateMovie from "./components/CreateMovie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Movies from "./components/Movies";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Healthcheck />
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
                            path="/movies"
                            element={
                                <div className="text-gray-100">
                                    <Movies />
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
        </QueryClientProvider>
    );
}

export default App;
