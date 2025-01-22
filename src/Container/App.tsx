import React from "react";
import { Footer, Header } from "../Components/Layout";
import { Home, ComputerDetails, NotFound } from "../Pages";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <Header />
            <div className="pb-5">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/computerDetails/:computerId"
                        element={<ComputerDetails />}
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
