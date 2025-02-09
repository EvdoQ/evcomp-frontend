import React, { useState } from "react";
import { useGetComputerByIdQuery } from "../Apis/computerApi";
import { useParams, useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function ComputerDetails() {
    const navigate = useNavigate();
    const { computerId } = useParams();
    const { data: computer, isLoading } = useGetComputerByIdQuery(computerId);

    if (isLoading) return <MainLoader />;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 justify-content-center">
                    <img
                        src={computer.image}
                        alt="Computer"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="fw-bold">{computer.title}</h1>
                    <p className="text-muted">{computer.shortDescription}</p>
                    <h2 className="fw-bold">{computer.price}₽</h2>
                    <button className="btn btn-success w-100 mb-3">
                        Забронировать
                    </button>
                    <h3>Детали</h3>
                    <hr className="my-2" />
                    <ul className="text-muted">
                        <li>Windows 11 Pro</li>
                        <li>
                            NVIDIA GeForce RTX 4060 / RTX 4060 Ti / RTX 4070
                        </li>
                        <li>Intel Core i5-12400F или AMD Ryzen 5 8400F</li>
                        <li>16GB / 32GB DDR4 / DDR5 RAM</li>
                        <li>1TB / 2TB NVMe M.2 SSD</li>
                        <li>ARGB / Wi-Fi / Bluetooth</li>
                        <li>80 Plus Bronze</li>
                        <li>Андервольтинг и разгон видеокарты</li>
                    </ul>
                    <hr className="my-2" />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <h3>Характеристики</h3>
                    <hr className="my-2" />
                    <p>
                        Процессор: <strong>{computer.processor}</strong>
                    </p>
                    <p>
                        Видеокарта: <strong>{computer.graphicsCard}</strong>
                    </p>
                    <p>
                        Материнская плата:{" "}
                        <strong>{computer.motherboard}</strong>
                    </p>
                    <p>
                        Оперативная память: <strong>{computer.ram}</strong>
                    </p>
                    <p>
                        Накопитель: <strong>{computer.storage}</strong>
                    </p>
                    <p>
                        Корпус: <strong>{computer.case}</strong>
                    </p>
                    <p>
                        Блок питания: <strong>{computer.powerSupply}</strong>
                    </p>
                    <p>
                        Кулер: <strong>{computer.processorCooler}</strong>
                    </p>
                    <hr className="my-2" />
                </div>
                <div className="col-md-6">
                    <h3>Производительность</h3>
                    <hr className="my-2" />
                    <p>
                        Cyberpunk 2077:{" "}
                        <strong className="text-success">90-140 FPS</strong>
                    </p>
                    <p>
                        PUBG Ultra:{" "}
                        <strong className="text-success">145-160 FPS</strong>
                    </p>
                    <p>
                        Counter-Strike 2:{" "}
                        <strong className="text-success">250-300 FPS</strong>
                    </p>
                    <p>
                        GTA V:{" "}
                        <strong className="text-success">95-110 FPS</strong>
                    </p>
                    <hr className="my-2" />
                </div>
            </div>
        </div>
    );
}

export default ComputerDetails;
