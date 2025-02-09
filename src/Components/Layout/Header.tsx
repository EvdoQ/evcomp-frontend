import { RootState } from "../../Storage/Redux/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userModel } from "../../Interfaces";
import {
    emptyUserState,
    setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";

let logo = require("../../Assets/Images/logo.webp");

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/");
    };

    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="nav-link" aria-current="page" to="/">
                        <img
                            src={logo}
                            style={{ height: "40px", borderRadius: "50%" }}
                            className="m-1"
                        />
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul
                            id="navbar"
                            className="navbar-nav w-100 d-flex justify-content-end align-items-end"
                        >
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/"
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/configurator"
                                >
                                    Конфигуратор
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    onClick={() =>
                                        navigate("computer/computerlist")
                                    }
                                    role="button"
                                    aria-expanded="false"
                                >
                                    Панель администратора
                                </a>
                            </li>
                            <div
                                className="d-flex"
                                style={{ marginLeft: "auto" }}
                            >
                                {userData.id && (
                                    <>
                                        <li className="nav-item">
                                            <button
                                                className="nav-link active"
                                                style={{
                                                    cursor: "pointer",
                                                    background: "transparent",
                                                    border: 0,
                                                }}
                                            >
                                                Привет, {userData.fullName}
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="btn btn-outlined text-white mx-2"
                                                style={{
                                                    border: "none",
                                                    height: "40px",
                                                    width: "100px",
                                                }}
                                                onClick={handleLogout}
                                            >
                                                Выход
                                            </button>
                                        </li>
                                    </>
                                )}

                                {!userData.id && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link text-white"
                                                to="/register"
                                            >
                                                Зарегистрироваться
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="btn btn-outlined text-white mx-2"
                                                style={{
                                                    border: "none",
                                                    height: "40px",
                                                    width: "100px",
                                                }}
                                                to="/login"
                                            >
                                                Войти
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
