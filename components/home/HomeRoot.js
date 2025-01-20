import Table from "../table/Table";
import Setup from "./Setup";
import { useEffect, useState } from "react";
import { produce } from "immer";
import History from "./History";
import Frequncies from "../frequencies/Frequencies";

export default function HomeRoot() {
    const [setup, setSetup] = useState({
        blinds: ["1", "2"],
        initialStacks: ["200", "200", "200", "200", "200", "200"],
        heroPosition: 2,
        holeCards: ["Ad", "Kd"],
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

    useEffect(() => {
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
    }, [setup.blinds, setup.initialStacks]);

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
            <section className="flex flex-col items-center px-10 py-16 bg-neutral-800 bg-opacity-10">
                <h2 className="text-3xl text-neutral-600 tracking-wider mb-4">
                    FREQUENCIES
                </h2>
                <p className="max-w-[80ch] text-neutral-500 text-center mb-12 leading-8">
                    The solver needs to know which hands each remaining player can have in the defined scenario.
                    A <strong>relative</strong> frequency between zero and a thousand should be given to each hand so that we can distinguish between hands that are more likely in a player's range than others.
                    A frequency of zero means that the given hand will not appear at all in a player's range.
                </p>
                <Frequncies
                    spot={spot}
                    frequencies={frequencies}
                    setFrequencies={setFrequencies}
                />
            </section>
        </div>
    );
};