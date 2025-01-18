import { deck } from "@/lib/cards";
import { produce } from "immer";

export default function Setup({ setup, setSetup }) {
    return (
        <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex flex-col items-center gap-1">
                <div className="text-neutral-500">
                    Blinds
                </div>
                <div className="flex gap-1">
                    {setup.blinds.map((value, i) => (
                        <input
                            key={"blind-input-" + i}
                            className="bg-neutral-800 w-16 px-4 py-3 rounded-sm outline-none border focus:border-neutral-700 text-sm text-center placeholder-neutral-600 spinner-less"
                            type="number"
                            value={value}
                            onChange={e => setSetup(produce(p => { p.blinds[i] = Number(e.target.value) }))}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="text-neutral-500">
                    Initial Stack Sizes
                </div>
                <div className="flex justify-center gap-1 flex-wrap">
                    {setup.initialStacks.map((value, i) => (
                        <input
                            key={"initial-stack-input-" + i}
                            className="bg-neutral-800 w-16 px-4 py-3 rounded-sm outline-none border focus:border-neutral-700 text-sm text-center placeholder-neutral-600 spinner-less"
                            type="number"
                            value={value}
                            onChange={e => setSetup(produce(p => { p.initialStacks[i] = Number(e.target.value) }))}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="text-neutral-500">
                    Position
                </div>
                <select
                    className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                    value={String(setup.heroPosition)}
                    onChange={e => setSetup(produce(p => { p.heroPosition = Number(e.target.value) }))}
                >
                    <option value="0">Small Blind</option>
                    <option value="1">Big Blind</option>
                    <option value="2">Under The Gun</option>
                    <option value="3">Hijack</option>
                    <option value="4">Cutoff</option>
                    <option value="5">Dealer Button</option>
                </select>
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="text-neutral-500">
                    Hand
                </div>
                <div className="flex gap-1">
                    <select
                        className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                        value={setup.holeCards[0]}
                        onChange={e => setSetup(produce(p => { p.holeCards[0] = e.target.value }))}
                    >
                        {deck.map(card => (
                            <option
                                key={card}
                                value={card}
                                disabled={setup.holeCards.includes(card)}
                            >
                                {card}
                            </option>
                        ))}
                    </select>
                    <select
                        className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                        value={setup.holeCards[1]}
                        onChange={e => setSetup(produce(p => { p.holeCards[1] = e.target.value }))}
                    >
                        {deck.map(card => (
                            <option
                                key={card}
                                value={card}
                                disabled={setup.holeCards.includes(card)}
                            >
                                {card}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};