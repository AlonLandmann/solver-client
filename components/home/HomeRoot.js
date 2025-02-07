import Table from "../table/Table";
import Setup from "./Setup";
import { useEffect, useState } from "react";
import { produce } from "immer";
import History from "./History";
import { intToCard, cardToInt, combos, comboIndices } from "@/lib/cards";
import Result from "../result/Result";
import SetupStorage from "./SetupStorage";
import AsyncButton from "../_common/AsyncButton";
import Frequencies from "../frequencies/Frequencies";

function getNrBoardCardsRevealed(startingStreet, infoSetStreet) {
    if (startingStreet == 0) {
        if (infoSetStreet == 0) return 0;
        if (infoSetStreet == 1) return 3;
        if (infoSetStreet == 2) return 4;
        if (infoSetStreet == 3) return 5;
    }

    if (startingStreet == 1) {
        if (infoSetStreet == 1) return 0;
        if (infoSetStreet == 2) return 1;
        if (infoSetStreet == 3) return 2;
    }

    if (startingStreet == 2) {
        if (infoSetStreet == 2) return 0;
        if (infoSetStreet == 3) return 1;
    }

    if (startingStreet == 3) {
        if (infoSetStreet == 3) return 0;
    }
}

function processResultCompletely(json, startingStreet, board, frequencies) {
    const nodes = {};

    for (let i = 0; i < json.length; i++) {
        const nrBoardCardsRevealed = getNrBoardCardsRevealed(startingStreet, json[i].street);
        const actionString = json[i].key.slice(0, -(2 + nrBoardCardsRevealed)).join("_");
        const boardString = nrBoardCardsRevealed > 0 ? json[i].key.slice(-nrBoardCardsRevealed).join("_") : "";
        const key = `${actionString}:${boardString}`;


        if (!(key in nodes)) {

            if (json[i].player === -1) {
                console.log("-1 node");
            }

            nodes[key] = {
                key: key,
                player: json[i].player,
                street: json[i].street,
                stack: json[i].stack,
                committed: json[i].committed,
                toCall: json[i].toCall,
                potBeforeCall: json[i].potBeforeCall,
                board: board.concat(nrBoardCardsRevealed > 0 ? json[i].key.slice(-nrBoardCardsRevealed).map(int => intToCard(int)) : []),
                actions: json[i].strategy.map(item => item.action),
                frequencies: null,
                strategies: Array(1326).fill(Array(json[i].strategy.length).fill(0)),
                parentKey: null,
                childKeys: [],
            };
        }

        const card1 = json[i].key[json[i].key.length - nrBoardCardsRevealed - 2];
        const card2 = json[i].key[json[i].key.length - nrBoardCardsRevealed - 1];
        const comboIndex = comboIndices[intToCard(card1) + intToCard(card2)];

        nodes[key].strategies[comboIndex] = json[i].strategy.map(item => item.frequency);
    }

    for (let key in nodes) {
        const actionString = key.split(":")[0];

        if (actionString === "") {
            nodes[key].parentKey = null;
            continue;
        }

        const actions = actionString.split("_");

        let parentActionString;

        if (actions.length === 1) {
            parentActionString = "";
        } else {
            parentActionString = actions.slice(0, actions.length - 1).join("_");
        }

        const parentKey = Object.keys(nodes).find(k => k.slice(0, parentActionString.length) === parentActionString);

        nodes[key].parentKey = parentKey;
        nodes[parentKey].childKeys.push(key);
    }

    nodes[":"].frequencies = produce(frequencies, p => { });

    function passFrequenciesOnToChildren(node) {
        for (const childKey of node.childKeys) {
            const childActionHistoryItems = childKey.split(":")[0].split("_");
            const lastAction = Number(childActionHistoryItems[childActionHistoryItems.length - 1]);
            const lastActionIndex = node.actions.indexOf(lastAction);

            nodes[childKey].frequencies = produce(node.frequencies, p => {
                p[node.player] = node.frequencies[node.player].map((f, i) => f * node.strategies[i][lastActionIndex]);
            });

            passFrequenciesOnToChildren(nodes[childKey]);
        }
    }

    passFrequenciesOnToChildren(nodes[":"]);

    return nodes;
}

export default function HomeRoot() {
    const [setup, setSetup] = useState({
        blinds: ["1", "2"],
        initialStacks: ["200", "200", "200", "200", "200", "200"],
        heroPosition: 2,
        holeCards: ["Ad", "Kd"],
        loadedSetup: false,
    });

    const [spot, setSpot] = useState({
        player: 2,
        street: 0,
        board: [],
        hasFolded: [false, false, false, false, false, false],
        hasActed: [false, false, false, false, false],
        lastActions: ["sb", "bb", null, null, null, null],
        minRaise: 2,
        stacks: [199, 198, 200, 200, 200, 200],
        committed: [1, 2, 0, 0, 0, 0],
        mainPotShares: [0, 0, 0, 0, 0, 0],
    });

    const [frequencies, setFrequencies] = useState([
        Array(1326).fill(0),
        Array(1326).fill(0),
        Array(1326).fill(0),
        Array(1326).fill(0),
        Array(1326).fill(0),
        Array(1326).fill(0),
    ]);

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!setup.loadedSetup) {
            setSpot(produce(p => {
                const sbSet = Math.min(Number(setup.initialStacks[0]), Number(setup.blinds[0]));
                const bbSet = Math.min(Number(setup.initialStacks[1]), Number(setup.blinds[1]));
                p.minRaise = Number(setup.blinds[1]);
                p.stacks = setup.initialStacks.map(s => Number(s));
                p.stacks[0] -= sbSet;
                p.stacks[1] -= bbSet;
                p.committed[0] = sbSet;
                p.committed[1] = bbSet;
            }));
        }
    }, [setup.blinds, setup.initialStacks]);

    async function runSolver() {
        const nrCombosPerPlayer = [0, 0, 0, 0, 0, 0];
        const frequencyTransferData = [];

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 1326; j++) {
                if (frequencies[i][j] > 0) {
                    nrCombosPerPlayer[i]++;
                    frequencyTransferData.push(cardToInt(combos[j].slice(0, 2)));
                    frequencyTransferData.push(cardToInt(combos[j].slice(2, 4)));
                    frequencyTransferData.push(frequencies[i][j]);
                }
            }
        }

        const body = {
            street: spot.street,
            board: spot.board.map(card => cardToInt(card)).concat(Array(5 - spot.board.length).fill(-1)),
            nrCombosPerPlayer: nrCombosPerPlayer,
            frequencies: frequencyTransferData,
            player: spot.player,
            bigBlind: Number(setup.blinds[1]),
            minRaise: spot.minRaise,
            hasFolded: spot.hasFolded,
            hasActed: spot.hasActed,
            stacks: spot.stacks,
            committed: spot.committed,
            mainPotShares: spot.mainPotShares,
            nrIterations: 1000000,
        };

        const res = await window.fetch(`http://localhost:8000`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify(body),
        });

        const json = await res.json();

        if (json) {
            setResult(processResultCompletely(json, spot.street, spot.board, frequencies));
        } else {
            console.log("failed");
        }
    }

    return (
        <div className="bg-neutral-900 min-h-screen">
            <section className="flex flex-col items-center px-10 py-16 border-b bg-neutral-800 bg-opacity-10">
                <i className="bi bi-cpu text-7xl text-neutral-600 mb-9"></i>
                <h1 className="text-5xl font-medium text-neutral-400 text-center mb-5">
                    Hold'em Solver
                </h1>
                <p className="text-xl text-neutral-300 text-center">
                    Solve any postflop spot you like. It's completely <strong>free</strong>!
                </p>
            </section>
            <section className="flex flex-col items-center gap-8 px-10 py-16 border-b">
                <h2 className="text-3xl text-neutral-700 tracking-wider mb-8">
                    SCENARIO
                </h2>
                <Setup
                    setup={setup}
                    setSetup={setSetup}
                />
                <History
                    setup={setup}
                    spot={spot}
                    setSpot={setSpot}
                />
                <Table
                    setup={setup}
                    spot={spot}
                />
            </section>
            <section className="flex flex-col items-center px-10 py-16 border-b bg-neutral-800 bg-opacity-10">
                <h2 className="text-3xl text-neutral-600 tracking-wider mb-4">
                    FREQUENCIES
                </h2>
                <p className="max-w-[80ch] text-neutral-500 text-center mb-12 leading-8">
                    The solver needs to know which hands each remaining player can have in the defined scenario.
                    A <strong>relative</strong> frequency between zero and a thousand should be given to each hand so that we can distinguish between hands that are more likely in a player's range than others.
                    A frequency of zero means that the given hand will not appear at all in a player's range.
                </p>
                <Frequencies
                    spot={spot}
                    frequencies={frequencies}
                    setFrequencies={setFrequencies}
                />
            </section>
            <section className="flex flex-col items-center px-10 py-16 border-b">
                <h2 className="text-3xl text-neutral-600 tracking-wider mb-12">
                    SOLVER
                </h2>
                <div className="mb-12">
                    <SetupStorage
                        setup={setup}
                        setSetup={setSetup}
                        spot={spot}
                        setSpot={setSpot}
                        frequencies={frequencies}
                        setFrequencies={setFrequencies}
                    />
                </div>
                <AsyncButton
                    utilClasses="border rounded-sm px-8 py-4 text-neutral-400 transition hover:text-neutral-200"
                    onClick={runSolver}
                >
                    Run Solver
                </AsyncButton>
            </section>
            {result &&
                <section className="flex flex-col items-center px-10 py-16 bg-neutral-800 bg-opacity-10">
                    <h2 className="text-3xl text-neutral-600 tracking-wider mb-12">
                        RESULT
                    </h2>
                    <Result
                        result={result}
                    />
                </section>
            }
        </div>
    );
};