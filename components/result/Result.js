import { useState } from "react";
import ResultMatrix from "./ResultMatrix";
import Board from "../table/Board";
import Categories from "./Categories";
import Navigator from "./Navigator";

const positions = [
    "Small Blind",
    "Big Blind",
    "Under The Gun",
    "Hijack",
    "Cutoff",
    "Dealer Button",
];

export default function Result({ result }) {
    const [resultNode, setResultNode] = useState(result[":"]);
    const [hovered, setHovered] = useState([]);

    return (
        <div>
            <div className="flex flex-col items-center py-6 gap-6">
                <div className="text-center text-xl text-neutral-400">
                    {positions[resultNode.player]}
                </div>
                <div>
                    <Board
                        tableWidth={710}
                        board={resultNode.board}
                    />
                </div>
            </div>
            <div
                className="grid gap-12"
                style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
            >
                <div className="py-6">
                    <Navigator
                        result={result}
                        resultNode={resultNode}
                        setResultNode={setResultNode}
                    />
                </div>
                <ResultMatrix
                    resultNode={resultNode}
                    hovered={hovered}
                />
                <div className="py-6">
                    <Categories
                        resultNode={resultNode}
                        setHovered={setHovered}
                    />
                </div>
            </div>
        </div>
    );
};