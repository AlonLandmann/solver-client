import { useState } from "react";
import Brush from "./Brush";
import Matrix from "./Matrix";
import Legend from "./Legend";

const positions = [
    "Small Blind",
    "Big Blind",
    "Under The Gun",
    "Hijack",
    "Cutoff",
    "Dealer Button",
];

export default function Frequncies({ spot, frequencies, setFrequencies }) {
    const [playerInEditor, setPlayerInEditor] = useState(0);
    const [selected, setSelected] = useState([]);

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
                        onClick={() => setPlayerInEditor(i)}
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
            <Matrix
                spot={spot}
                selected={selected}
                setSelected={setSelected}
                playerInEditor={playerInEditor}
                frequencies={frequencies}
            />
            <div className="py-6">
                <Brush
                    spot={spot}
                    selected={selected}
                    setSelected={setSelected}
                    playerInEditor={playerInEditor}
                    setFrequencies={setFrequencies}
                />
                <Legend
                    setSelected={setSelected}
                    playerInEditor={playerInEditor}
                    frequencies={frequencies}
                />
            </div>
        </div>
    );
};