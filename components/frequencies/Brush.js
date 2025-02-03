import { useState } from "react";
import Slider from "./Slider";
import { combos } from "@/lib/cards";
import { produce } from "immer";

export default function Brush({ spot, selected, setSelected, playerInEditor, setFrequencies }) {
    const [frequency, setFrequency] = useState(500);

    function handleApplyBrush() {
        setFrequencies(produce(p => {
            for (let i = 0; i < 1326; i++) {
                if (
                    spot.board.includes(combos[i].slice(0, 2)) ||
                    spot.board.includes(combos[i].slice(2, 4))
                ) {
                    p[playerInEditor][i] = 0;
                } else if (selected.includes(combos[i])) {
                    p[playerInEditor][i] = frequency;
                }
            }
        }));

        setSelected([]);
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <input
                    className="w-40 px-4 py-3 rounded-sm outline-none border text-sm bg-neutral-800 border-neutral-800 focus:border-neutral-700 text-neutral-100 placeholder-neutral-600"
                    type="number"
                    min={0}
                    max={1000}
                    step={1}
                    value={frequency}
                    onChange={e => setFrequency(Number(e.target.value))}
                />
                <Slider
                    frequency={frequency}
                    setFrequency={setFrequency}
                />
                <button
                    className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                    onClick={handleApplyBrush}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};