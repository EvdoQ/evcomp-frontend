import React, { useState } from "react";
import { useLoginUserMutation } from "../Apis/authApi";
import { userModel } from "../Interfaces";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { MainLoader } from "../Components/Page/Common";

function Login() {
    const [error, setError] = useState("");
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        role: "",
        name: "",
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginUser({
                userName: userInput.userName,
                password: userInput.password,
            }).unwrap();

            console.log(response);
            const { token } = response;
            const { fullName, id, userName, role }: userModel =
                jwtDecode(token);
            localStorage.setItem("token", token);
            dispatch(setLoggedInUser({ fullName, id, userName, role }));
            navigate("/");
        } catch (err: any) {
            console.error(err);
            setError(err.data?.errorMessages?.[0] || "Ошибка авторизации");
        }

        setLoading(false);
    };

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="mt-5">Login</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            required
                            name="userName"
                            value={userInput.userName}
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required
                            name="password"
                            value={userInput.password}
                            onChange={handleUserInput}
                        />
                    </div>
                </div>

                <div className="mt-2">
                    {error && <p className="text-danger">{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{ width: "200px" }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
