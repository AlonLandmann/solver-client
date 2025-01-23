import { cardToInt, deck } from "@/lib/cards";
import { produce } from "immer";
import { useState } from "react";

function ammendRevealedBoardCards(key, n, addedBoardCards) {
    const newBoardString = key
        .split(":")[1]
        .split("_")
        .slice(0, key.split(":")[1].split("_").length - n)
        .concat(addedBoardCards.map(card => cardToInt(card)))
        .join("_");

    return `${key.split(":")[0]}:${newBoardString}`;
}

export default function NavItem({ result, resultNode, setResultNode, navInfo }) {
    const [flop, setFlop] = useState(["", "", ""]);
    const [turn, setTurn] = useState("");
    const [river, setRiver] = useState("");

    function checkDisabled() {
        return (
            (navInfo.streetAdvance === "Flop" && (!flop[0] || !flop[1] || !flop[2])) ||
            (navInfo.streetAdvance === "Turn" && !turn) ||
            (navInfo.streetAdvance === "River" && !river)
        );
    }

    function handleNavToChildNode() {
        if (!navInfo.streetAdvance) {
            setResultNode(result[navInfo.childKey]);
        }

        if (navInfo.streetAdvance === "Flop") {
            const newKey = ammendRevealedBoardCards(navInfo.childKey, 3, flop);
            if (result[newKey]) {
                setResultNode(result[newKey]);
            } else {
                console.log(navInfo.childKey, newKey);
            }
        }

        if (navInfo.streetAdvance === "Turn") {
            const newKey = ammendRevealedBoardCards(navInfo.childKey, 1, [turn]);
            if (result[newKey]) {
                setResultNode(result[newKey]);
            } else {
                console.log(navInfo.childKey, newKey);
            }
        }

        if (navInfo.streetAdvance === "River") {
            const newKey = ammendRevealedBoardCards(navInfo.childKey, 1, [river]);
            if (result[newKey]) {
                setResultNode(result[newKey]);
            } else {
                console.log(navInfo.childKey, newKey);
            }
        }
    }

    return (
        <div className="flex gap-1">
            <button
                className="w-32 px-3 py-2 border flex gap-3 items-center rounded-sm text-neutral-400 cursor-pointer transition hover:text-neutral-100 disabled:cursor-default disabled:text-neutral-600 disabled:hover:text-neutral-600"
                disabled={checkDisabled()}
                onClick={handleNavToChildNode}
            >
                <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: navInfo.actionColor }}
                >
                    
                </div>
                <div className="text-left text-nowrap">
                    {navInfo.actionDisplay}
                </div>
            </button>
            {navInfo.streetAdvance === "Flop" && flop.map((_, i) => (
                <select
                    key={"flop-selection-" + i}
                    className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                    value={flop[i]}
                    onChange={e => setFlop(produce(p => { p[i] = e.target.value }))}
                >
                    <option value="">
                        --
                    </option>
                    {deck.map(card => (
                        <option
                            key={"flop-selection-" + i + "-option-" + card}
                            value={card}
                            disabled={resultNode.board.includes(card)}
                        >
                            {card}
                        </option>
                    ))}
                </select>
            ))}
            {navInfo.streetAdvance === "Turn" &&
                <select
                    className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                    value={turn}
                    onChange={e => setTurn(e.target.value)}
                >
                    <option value="">
                        --
                    </option>
                    {deck.map(card => (
                        <option
                            key={"turn-option-" + card}
                            value={card}
                            disabled={resultNode.board.includes(card)}
                        >
                            {card}
                        </option>
                    ))}
                </select>
            }
            {navInfo.streetAdvance === "River" &&
                <select
                    className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                    value={river}
                    onChange={e => setRiver(e.target.value)}
                >
                    <option value="">
                        --
                    </option>
                    {deck.map(card => (
                        <option
                            key={"river-option-" + card}
                            value={card}
                            disabled={resultNode.board.includes(card)}
                        >
                            {card}
                        </option>
                    ))}
                </select>
            }
        </div>
    );
};