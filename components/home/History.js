import { deck } from "@/lib/cards";
import { produce } from "immer";
import { useState } from "react";

const positions = ["SB", "BB", "UTG", "HJ", "CO", "BTN"];
const streets = ["Preflop", "Flop", "Turn", "River"];

function determineSpotTypeAndActions(spot) {
    const nrFolded = spot.hasFolded.filter(folded => folded === true).length;
    const nrAllIn = spot.stacks.filter(stack => stack === 0).length;
    const hasActed = spot.hasActed[spot.player];
    const committed = spot.committed[spot.player];
    const stack = spot.stacks[spot.player];
    const stake = Math.max(...spot.committed);
    const toCall = stake - committed;

    if (nrFolded === 5) {
        return {
            type: "takedown",
        };
    }

    if (nrFolded + nrAllIn === 5 && toCall > 0) {
        return {
            type: "player-node",
            actions: {
                fold: { amount: 0 },
                call: { amount: Math.min(stack, toCall) },
            },
        };
    }

    if (nrFolded + nrAllIn === 5 && toCall === 0 && spot.street < 3) {
        return {
            type: "street-node",
        };
    }

    if (nrFolded + nrAllIn === 5 && toCall === 0 && spot.street === 3) {
        return {
            type: "showdown",
        };
    }

    if (toCall > 0 && stack <= toCall) {
        return {
            type: "player-node",
            actions: {
                fold: { amount: 0 },
                call: { amount: stack },
            },
        };
    }

    if (toCall > 0 && stack > toCall && stack <= toCall + spot.minRaise) {
        return {
            type: "player-node",
            actions: {
                fold: { amount: 0 },
                call: { amount: toCall },
                raise: { amount: stack },
            },
        }
    }

    if (toCall > 0 && stack > toCall && stack > toCall + spot.minRaise) {
        return {
            type: "player-node",
            actions: {
                fold: { amount: 0 },
                call: { amount: toCall },
                raiseContinuous: { min: toCall + spot.minRaise, max: stack },
            },
        }
    }

    if (toCall === 0 && !hasActed && stack <= spot.minRaise) {
        return {
            type: "player-node",
            actions: {
                check: { amount: 0 },
                bet: { amount: stack },
            },
        }
    }

    if (toCall === 0 && !hasActed && stack > spot.minRaise) {
        return {
            type: "player-node",
            actions: {
                check: { amount: 0 },
                betContinuous: { min: spot.minRaise, max: stack },
            },
        }
    }

    if (toCall === 0 && hasActed && spot.street < 3) {
        return {
            type: "street-node",
        };
    }

    if (toCall === 0 && hasActed && spot.street === 3) {
        return {
            type: "showdown",
        };
    }
}

export default function History({ setup, spot, setSpot }) {
    const [size, setSize] = useState("");
    const [flop, setFlop] = useState(["Ah", "Kh", "Qh"]);
    const [turn, setTurn] = useState("Jh");
    const [river, setRiver] = useState("Th");

    const { type, actions } = determineSpotTypeAndActions(spot);

    function handlePlayerAction(action) {
        setSpot(produce(p => {
            if (action === "fold") {
                p.lastActions[p.player] = "fold";
                p.hasFolded[p.player] = true;
            }

            if (action === "call") {
                p.lastActions[p.player] = "call";
                p.stacks[p.player] -= actions.call.amount;
                p.committed[p.player] += actions.call.amount;
            }

            if (action === "raise") {
                p.lastActions[p.player] = "raise";
                p.stacks[p.player] -= actions.raise.amount;
                p.committed[p.player] += actions.raise.amount;
                p.minRaise = Math.max(p.minRaise, actions.raise.amount - actions.call.amount);
            }

            if (action === "raiseContinuous") {
                p.lastActions[p.player] = "raise";
                p.stacks[p.player] -= Number(size);
                p.committed[p.player] += Number(size);
                p.minRaise = Math.max(p.minRaise, Number(size) - actions.call.amount);
            }

            if (action === "check") {
                p.lastActions[p.player] = "check";
            }

            if (action === "bet") {
                p.lastActions[p.player] = "bet";
                p.stacks[p.player] -= actions.bet.amount;
                p.committed[p.player] += actions.bet.amount;
                p.minRaise = Math.max(p.minRaise, actions.bet.amount);
            }

            if (action === "betContinuous") {
                p.lastActions[p.player] = "bet";
                p.stacks[p.player] -= Number(size);
                p.committed[p.player] += Number(size);
                p.minRaise = Math.max(p.minRaise, Number(size));
            }

            p.hasActed[p.player] = true;

            for (let i = 1; i < 6; i++) {
                p.player = (p.player + 1) % 6;

                if (!p.hasFolded[p.player] && p.stacks[p.player] > 0) {
                    break;
                }
            }
        }));

        setSize("");
    }

    function handleStreetAction(action) {
        setSpot(produce(p => {
            for (let i = 0; i < 6; i++) {
                p.hasActed[i] = false;
                p.mainPotShares[i] = p.mainPotShares[i] + p.committed[i];
                p.committed[i] = 0;
            }

            p.minRaise = Number(setup.blinds[1]);
            p.street += 1;
            p.lastActions = [null, null, null, null, null, null];

            for (let i = 0; i < 6; i++) {
                if (!p.hasFolded[i] && p.stacks[i] > 0) {
                    p.player = i;
                    break;
                }
            }

            if (action === "flop") {
                p.board.push(...flop);
            }

            if (action === "turn") {
                p.board.push(turn);
            }

            if (action === "river") {
                p.board.push(river);
            }
        }));
    }

    return (
        <div className="flex flex-col items-center gap-1">
            {type === "player-node" &&
                <div className="text-neutral-500">
                    {positions[spot.player]} - Action
                </div>
            }
            {type === "street-node" &&
                <div className="text-neutral-500">
                    {streets[spot.street + 1]}
                </div>
            }
            <div className="flex gap-1">
                {type === "player-node" && "fold" in actions &&
                    <button
                        className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                        onClick={() => handlePlayerAction("fold")}
                    >
                        Fold
                    </button>
                }
                {type === "player-node" && "call" in actions &&
                    <button
                        className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                        onClick={() => handlePlayerAction("call")}
                    >
                        Call
                    </button>
                }
                {type === "player-node" && "raise" in actions &&
                    <button
                        className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200 flex gap-3"
                        onClick={() => handlePlayerAction("raise")}
                    >
                        <div>Raise</div>
                        <div className="text-neutral-500">{actions.raise.amount}</div>
                    </button>
                }
                {type === "player-node" && "raiseContinuous" in actions &&
                    <div className="flex gap-1">
                        <input
                            className="w-40 px-4 py-3 rounded-sm outline-none border text-sm text-right bg-neutral-800 border-neutral-800 focus:border-neutral-700 text-neutral-100 placeholder-neutral-600"
                            placeholder={`${actions.raiseContinuous.min} - ${actions.raiseContinuous.max}`}
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        />
                        <button
                            className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                            onClick={() => handlePlayerAction("raiseContinuous")}
                        >
                            Raise
                        </button>
                    </div>
                }
                {type === "player-node" && "check" in actions &&
                    <button
                        className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                        onClick={() => handlePlayerAction("check")}
                    >
                        Check
                    </button>
                }
                {type === "player-node" && "bet" in actions &&
                    <button
                        className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200 flex gap-3"
                        onClick={() => handlePlayerAction("bet")}
                    >
                        <div>Bet</div>
                        <div className="text-neutral-500">{actions.bet.amount}</div>
                    </button>
                }
                {type === "player-node" && "betContinuous" in actions &&
                    <div className="flex gap-1">
                        <input
                            className="w-40 px-4 py-3 rounded-sm outline-none border text-sm text-right bg-neutral-800 border-neutral-800 focus:border-neutral-700 text-neutral-100 placeholder-neutral-600"
                            placeholder={`${actions.betContinuous.min} - ${actions.betContinuous.max}`}
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        />
                        <button
                            className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                            onClick={() => handlePlayerAction("betContinuous")}
                        >
                            Bet
                        </button>
                    </div>
                }
                {type === "street-node" && spot.street === 0 &&
                    <div className="flex gap-1">
                        {flop.map((_, i) => (
                            <select
                                className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                                value={flop[i]}
                                onChange={e => setFlop(produce(p => { p[i] = e.target.value }))}
                            >
                                {deck.map(card => (
                                    <option
                                        key={"flop-" + i + "-option-" + card}
                                        value={card}
                                        disabled={spot.board.includes(card)}
                                    >
                                        {card}
                                    </option>
                                ))}
                            </select>
                        ))}
                        <button
                            className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                            onClick={() => handleStreetAction("flop")}
                        >
                            Set Flop
                        </button>
                    </div>
                }
                {type === "street-node" && spot.street === 1 &&
                    <div className="flex gap-1">
                        <select
                            className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                            value={turn}
                            onChange={e => setTurn(e.target.value)}
                        >
                            {deck.map(card => (
                                <option
                                    key={"turn-option-" + card}
                                    value={card}
                                    disabled={spot.board.includes(card)}
                                >
                                    {card}
                                </option>
                            ))}
                        </select>
                        <button
                            className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                            onClick={() => handleStreetAction("turn")}
                        >
                            Set Turn
                        </button>
                    </div>
                }
                {type === "street-node" && spot.street === 2 &&
                    <div className="flex gap-1">
                        <select
                            className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                            value={river}
                            onChange={e => setRiver(e.target.value)}
                        >
                            {deck.map(card => (
                                <option
                                    key={"river-option-" + card}
                                    value={card}
                                    disabled={spot.board.includes(card)}
                                >
                                    {card}
                                </option>
                            ))}
                        </select>
                        <button
                            className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                            onClick={() => handleStreetAction("river")}
                        >
                            Set River
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};