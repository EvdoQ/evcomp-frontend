import React from "react";
import computerModel from "../../../Interfaces/computerModel";
import { Link } from "react-router-dom";

interface Props {
    computer: computerModel;
}

function ComputerCard(props: Props) {
    return (
        <div className="col-md-4 d-flex pe-0 pb-3 pt-1">
            <div className="card border-0 shadow-sm">
                <Link to={`/computerDetails/${props.computer.id}`}>
                    <img
                        src={props.computer.image}
                        className="card-img-top"
                        alt=""
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title fw-bold mb-1">
                        {props.computer.title}
                    </h5>
                    <p className="card-text text-muted mb-1">
                        {props.computer.shortDescription}
                    </p>
                    <div className="d-flex align-items-center">
                        <span className="me-2">⭐️⭐️⭐️⭐️⭐️</span>
                        <span className="text-muted">
                            {5} ({15})
                        </span>
                    </div>
                    <hr className="my-2" />
                    <p className="mb-1">
                        <strong>Ключевые компоненты</strong>
                    </p>
                    <p className="mb-1">{props.computer.processor}</p>
                    <p className="mb-1">{props.computer.graphicsCard}</p>
                    <p className="mb-1">{props.computer.ram}</p>
                    <p className="mb-1">{props.computer.motherboard}</p>
                    <hr className="my-2" />
                    <h4 className="fw-bold mb-3">{props.computer.price}₽</h4>
                    <Link
                        to={`/computerDetails/${props.computer.id}`}
                        className="btn btn-dark w-100"
                    >
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ComputerCard;
