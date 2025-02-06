import React, { useEffect } from "react";
import { Footer, Header } from "../Components/Layout";
import { Home, ComputerDetails, NotFound, Login, Register } from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            const { id, fullName, userName, role }: userModel =
                jwt_decode(localToken);
            dispatch(setLoggedInUser({ id, fullName, userName, role }));
        }
    }, []);

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
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
