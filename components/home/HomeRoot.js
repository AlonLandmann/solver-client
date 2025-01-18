import useWindowDimensions from "@/hooks/useWindowDimensions";
import Table from "../table/Table";
import Setup from "./Setup";
import { useEffect, useState } from "react";
import { produce } from "immer";

export default function HomeRoot() {
    const [width, height] = useWindowDimensions();

    const [setup, setSetup] = useState({
        blinds: ["1", "2"],
        initialStacks: ["200", "200", "200", "200", "200", "200"],
        heroPosition: 2,
        holeCards: ["Ad", "Kd"],
    });

    const [spot, setSpot] = useState({
        board: [],
        hasFolded: [false, false, false, false, false, false],
        hasActed: [false, false, false, false, false],
        lastActions: ["sb", "bb", null, null, null, null],
        stacks: [199, 198, 200, 200, 200, 200],
        committed: [1, 2, 0, 0, 0, 0],
        mainPotShares: [0, 0, 0, 0, 0, 0],
    });

    useEffect(() => {
        setSpot(produce(p => {
            p.stacks = setup.initialStacks.map(s => Number(s));

            const sbSet = Math.min(p.stacks[0], Number(setup.blinds[0]));
            const bbSet = Math.min(p.stacks[1], Number(setup.blinds[1]));

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
            <section className="flex flex-col items-center gap-20 px-10 py-16 border-b">
                <Setup
                    setup={setup}
                    setSetup={setSetup}
                />
                <Table
                    availableWidth={width - 80}
                    availableHeight={height - 80}
                    setup={setup}
                    spot={spot}
                />
            </section>
        </div>
    );
};