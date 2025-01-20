import { useState } from "react";
import Brush from "./Brush";
import Matrix from "./Matrix";
import Legend from "./Legend";

export default function Frequncies({ spot, frequencies, setFrequencies }) {
    const [selected, setSelected] = useState([]);

    return (
        <div
            className="grid gap-8"
            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
            <div></div>
            <Matrix
                spot={spot}
                selected={selected}
                setSelected={setSelected}
                frequencies={frequencies[0]}
            />
            <div>
                <Brush
                    spot={spot}
                    selected={selected}
                    setSelected={setSelected}
                    setFrequencies={setFrequencies}
                />
                <Legend
                    setSelected={setSelected}
                    frequencies={frequencies[0]}
                />
            </div>
        </div>
    );
};