import { useEffect } from "react";
import computerModel from "../../../Interfaces/computerModel";
import ComputerCard from "./ComputerCard";
import { useDispatch } from "react-redux";
import { useGetComputersQuery } from "../../../Apis/computerApi";
import { setComputer } from "../../../Storage/Redux/computerSlice";
import { Loading } from "../../../Pages";

function ComputerList() {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetComputersQuery(null);

    useEffect(() => {
        if (!isLoading) {
            dispatch(setComputer(data));
        }
    }, [isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    if (!data || data.length === 0) {
        return <p className="text-danger text-center">No data available.</p>;
    }

    return (
        <div className="container row">
            {data.map((computer: computerModel, index: number) => (
                <ComputerCard computer={computer} key={index} />
            ))}
        </div>
    );
}
export default ComputerList;
