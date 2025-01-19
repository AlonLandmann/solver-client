import { useState } from "react";

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

const positions = ["SB", "BB", "UTG", "HJ", "CO", "BTN"];

export default function History({ spot, setSpot }) {
    const { type, actions } = determineSpotTypeAndActions(spot);
    const [size, setSize] = useState("");

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="text-neutral-500">
                {positions[spot.player]} - Action
            </div>
            <div className="flex gap-1">
                {type === "player-node" && "fold" in actions &&
                    <button className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200">
                        Fold
                    </button>
                }
                {type === "player-node" && "call" in actions &&
                    <button className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200">
                        Call
                    </button>
                }
                {type === "player-node" && "raise" in actions &&
                    <button className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200 flex gap-3">
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
                        <button className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200">
                            Raise
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};