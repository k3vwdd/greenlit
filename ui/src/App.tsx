import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Healthcheck from "./components/Healthcheck";

function App() {

    return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-gray-100 container mx-auto">
              <Home />
            </div>
          }
        />
        <Route
          path="/v1/healthcheck"
          element={
            <div className="text-gray-100 container mx-auto">
              <Healthcheck />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
