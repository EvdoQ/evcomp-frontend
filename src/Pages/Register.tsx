import React, { useState } from "react";
import { useRegisterUserMutation } from "../Apis/authApi";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function Register() {
    const [registerUser] = useRegisterUserMutation();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        role: "",
        name: "",
    });
    const navigate = useNavigate();

    const handleUserInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setUserInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await registerUser({
                userName: userInput.userName,
                password: userInput.password,
                role: userInput.role,
                name: userInput.name,
            }).unwrap();

            console.log(response);
            setLoading(false);
        } catch (err: any) {
            console.error(err);
        }

        setLoading(false);
        navigate("/login");
    };

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="mt-5">Register</h1>
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
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            required
                            name="name"
                            value={userInput.name}
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
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <select
                            className="form-control form-select"
                            required
                            name="role"
                            value={userInput.role}
                            onChange={handleUserInput}
                        >
                            <option value="">--Select Role--</option>
                            <option value={`Customer`}>Customer</option>
                            <option value={`Admin`}>Admin</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
