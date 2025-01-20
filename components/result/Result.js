import { useState } from "react";
import ResultMatrix from "./ResultMatrix";

const positions = [
    "Small Blind",
    "Big Blind",
    "Under The Gun",
    "Hijack",
    "Cutoff",
    "Dealer Button",
];

export default function Result({ spot, result }) {
    const [playerInResult, setPlayerInResult] = useState(2);

    return (
        <div
            className="grid gap-12"
            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
            <div className="py-6 flex flex-col gap-2">
                {positions.map((position, i) => (
                    <div
                        key={position}
                        className={`
                            px-5 py-4 border rounded-sm text-sm flex justify-between gap-1
                            ${spot.hasFolded[i] ? "" : "transition hover:bg-neutral-800 cursor-pointer"}
                        `}
                        onClick={() => setPlayerInResult(i)}
                    >
                        <div className={spot.hasFolded[i] ? "text-neutral-700" : "text-neutral-300"}>
                            {position}
                        </div>
                        {spot.hasFolded[i] &&
                            <div className="text-neutral-700">
                                Folded
                            </div>
                        }

                    </div>
                ))}
            </div>
            <ResultMatrix
                spot={spot}
                result={result}
                playerInResult={playerInResult}
            />
            <div className="py-6"></div>
        </div>
    );
};