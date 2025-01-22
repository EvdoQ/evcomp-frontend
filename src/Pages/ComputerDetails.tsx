import React, { useState } from "react";
import { useGetComputerByIdQuery } from "../Apis/computerApi";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";

function ComputerDetails() {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { computerId } = useParams();
    const { data: computer, isLoading } = useGetComputerByIdQuery(computerId);
    const handleQuantity = (counter: number) => {
        let newQuantity = quantity + counter;
        if (newQuantity === 0) newQuantity = 1;
        setQuantity(newQuantity);
        return;
    };

    if (isLoading) return <Loading />;

    return (
        <div className="container pt-4 pt-md-5">
            <div className="row">
                <div className="col-md-7">
                    <h2 className="text-success">{computer.name}</h2>

                    <div className="mb-3">
                        <span className="badge text-bg-dark mx-1">
                            {computer.category}
                        </span>
                        {computer.specialTag && (
                            <span className="badge text-bg-light mx-1">
                                {computer.specialTag}
                            </span>
                        )}
                    </div>

                    <p className="fs-5">{computer.description}</p>

                    <ul className="list-group mb-3">
                        <li className="list-group-item">
                            <strong>Processor:</strong> {computer.processor}
                        </li>
                        <li className="list-group-item">
                            <strong>Graphics Card:</strong>{" "}
                            {computer.graphicsCard}
                        </li>
                        <li className="list-group-item">
                            <strong>RAM:</strong> {computer.ram}
                        </li>
                        <li className="list-group-item">
                            <strong>Storage:</strong> {computer.storage}
                        </li>
                        <li className="list-group-item">
                            <strong>Motherboard:</strong> {computer.motherboard}
                        </li>
                        <li className="list-group-item">
                            <strong>Power Supply:</strong>{" "}
                            {computer.powerSupply}
                        </li>
                        <li className="list-group-item">
                            <strong>Cooler:</strong> {computer.processorCooler}
                        </li>
                        <li className="list-group-item">
                            <strong>Case:</strong> {computer.case} (
                            {computer.color})
                        </li>
                        {computer.hasWiFi && (
                            <li className="list-group-item">
                                <strong>Wi-Fi:</strong> Supported
                            </li>
                        )}
                        {computer.hasLightingControl && (
                            <li className="list-group-item">
                                <strong>Lighting Control:</strong> Yes
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center mb-4">
                        <h4 className="me-3">${computer.price}</h4>
                        <div className="quantity-box">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => handleQuantity(-1)}
                            >
                                -
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => handleQuantity(1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 mb-2">
                            <button className="btn btn-success w-100">
                                Add to Cart
                            </button>
                        </div>
                        <div className="col-md-5">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 mb-2">
                    <img
                        src={computer.image}
                        width="100%"
                        alt="No content"
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default ComputerDetails;
