import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import computerModel from "../../Interfaces/computerModel";
import {
    useDeleteComputerMutation,
    useGetComputersQuery,
} from "../../Apis/computerApi";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import withAdminAuth from "../../HigherOrderComponent/withAdminAuth";

interface AdminPanelProps {
    computers: computerModel[];
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

function ComputerList() {
    const { data, isLoading } = useGetComputersQuery(null);
    const [deleteMenuItem] = useDeleteComputerMutation();
    const navigate = useNavigate();
    const handleComputerDelete = async (id: number) => {
        deleteMenuItem(id);
    };

    if (isLoading) {
        return <MainLoader />;
    }

    return (
        <>
            {!isLoading && (
                <div className="p-1">
                    <h1 className="mb-4">Панель администратора</h1>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => navigate("/computer/computerupsert")}
                    >
                        Добавить новый компьютер
                    </button>
                    <table className="table table-striped shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Изображение</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((computer: computerModel) => (
                                <tr key={computer.id}>
                                    <td>
                                        <img
                                            src={computer.image}
                                            alt="no content"
                                            style={{
                                                width: "100%",
                                                maxWidth: "120px",
                                            }}
                                        />
                                    </td>
                                    <td>{computer.title}</td>
                                    <td>{computer.price.toLocaleString()}₽</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() =>
                                                navigate(
                                                    "/computer/computerupsert/" +
                                                        computer.id
                                                )
                                            }
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleComputerDelete(
                                                    computer.id
                                                )
                                            }
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default withAdminAuth(ComputerList);
