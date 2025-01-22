import React from "react";
import computerModel from "../../../Interfaces/computerModel";
import { Link } from "react-router-dom";

interface Props {
    computer: computerModel;
}

function ComputerCard(props: Props) {
    return (
        <div className="col-md-4 col-12 p-4">
            <div
                className="card"
                style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
            >
                <div className="card-body pt-2 position-relative">
                    <div className="row col-10 offset-1 p-4">
                        <Link to={`/computerDetails/${props.computer.id}`}>
                            <img
                                src={props.computer.image}
                                alt=""
                                className="w-100 mt-5 image-box"
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "contain",
                                }}
                            />{" "}
                        </Link>
                    </div>

                    <i
                        className="bi bi-palette-fill btn btn-dark"
                        style={{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            padding: "5px 10px",
                            borderRadius: "3px",
                            outline: "none !important",
                            cursor: "pointer",
                        }}
                    >
                        &nbsp; {props.computer.color}
                    </i>

                    <i
                        className="bi bi-cart4 btn btn-outline-dark"
                        style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            padding: "5px 10px",
                            borderRadius: "3px",
                            outline: "none !important",
                            cursor: "pointer",
                        }}
                    ></i>

                    <div className="text-center">
                        <p className="card-title m-0 text-dark fs-4">
                            <Link to={`/computerDetails/${props.computer.id}`}>
                                {props.computer.graphicsCard}
                            </Link>
                        </p>
                        <p
                            className="badge bg-secondary"
                            style={{ fontSize: "12px" }}
                        >
                            {props.computer.motherboard}
                        </p>
                        <p
                            className="badge bg-secondary"
                            style={{ fontSize: "12px" }}
                        >
                            {props.computer.processor}
                        </p>
                        <p
                            className="badge bg-secondary"
                            style={{ fontSize: "12px" }}
                        >
                            {props.computer.ram}
                        </p>
                    </div>

                    <p
                        className="card-text text-secondary"
                        style={{ textAlign: "center", fontSize: "14px" }}
                    >
                        {props.computer.description}
                    </p>

                    <div className="d-flex justify-content-center">
                        {props.computer.hasWiFi && (
                            <span className="badge bg-success me-2">Wi-Fi</span>
                        )}
                        {props.computer.hasLightingControl && (
                            <span className="badge bg-success">
                                Lighting Control
                            </span>
                        )}
                    </div>

                    <div className="row text-center mt-3">
                        <h4>${props.computer.price}</h4>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            <small>Power: {props.computer.powerSupply}</small>
                        </div>
                        <div>
                            <small>Storage: {props.computer.storage}</small>
                        </div>
                        <div>
                            <small>Case: {props.computer.case}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComputerCard;
