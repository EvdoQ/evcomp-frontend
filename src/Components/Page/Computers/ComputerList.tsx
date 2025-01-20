import { useEffect, useState } from "react";
import { computerModel } from "../../../Interfaces";
import ComputerCard from "./ComputerCard";

function ComputerList() {
    const [computers, setComputers] = useState<computerModel[]>([]);

    useEffect(() => {
        fetch("http://176.108.250.203:5001/api/Computer")
            .then((response) => response.json())
            .then((data) => {
                setComputers(data);
            });
    }, []);

    return (
        <div className="container row">
            {computers.length > 0 &&
                computers.map((computer, index) => (
                    <ComputerCard computer={computer} key={index} />
                ))}
        </div>
    );
}

export default ComputerList;
