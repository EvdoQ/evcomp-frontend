import React from "react";
import { ComputerList } from "../Components/Page/Computers/";

function Home() {
    return (
        <div>
            <div className="container p-2">
                <ComputerList />
            </div>
        </div>
    );
}

export default Home;
