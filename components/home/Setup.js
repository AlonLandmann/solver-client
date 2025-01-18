import { deck } from "@/lib/cards";
import { useState } from "react";

export default function Setup() {
    const [smallBlind, setSmallBlind] = useState(1);
    const [bigBlind, setBigBlind] = useState(2);
    const [initialStacks, setInitialStacks] = useState(Array(6).fill(200));
    const [heroPosition, setHeroPosition] = useState(2);
    const [holeCards, setHoleCards] = useState(["Ad", "Kd"]);

    return (
        <div>
            <div>
                Blinds
            </div>
            <div className="flex gap-1">
                <input
                    className="bg-neutral-800 w-16 px-4 py-3 rounded-sm outline-none border focus:border-neutral-700 text-sm text-center placeholder-neutral-600 spinner-less"
                    type="number"
                    value={smallBlind}
                    onChange={e => setSmallBlind(e.target.value)}
                />
                <input
                    className="bg-neutral-800 w-16 px-4 py-3 rounded-sm outline-none border focus:border-neutral-700 text-sm text-center placeholder-neutral-600 spinner-less"
                    type="number"
                    value={bigBlind}
                    onChange={e => setBigBlind(e.target.value)}
                />
            </div>
            <div>
                Initial Stacks
            </div>
            <div className="flex gap-1">
                {Array(6).fill(null).map((_, i) => (
                    <input
                        key={"initial-stack-input-" + i}
                        className="bg-neutral-800 w-16 px-4 py-3 rounded-sm outline-none border focus:border-neutral-700 text-sm text-center placeholder-neutral-600 spinner-less"
                        type="number"
                        value={initialStacks[i]}
                        onChange={e => setInitialStacks(p => { const n = [...p]; n[i] = e.target.value; return n })}
                    />
                ))}
            </div>
            <div>
                Position
            </div>
            <select
                className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                value={String(heroPosition)}
                onChange={e => setHeroPosition(Number(e.target.value))}
            >
                <option value="0">Small Blind</option>
                <option value="1">Big Blind</option>
                <option value="2">Under The Gun</option>
                <option value="3">Hijack</option>
                <option value="4">Cutoff</option>
                <option value="5">Dealer Button</option>
            </select>
            <div>
                Hole Cards
            </div>
            <div className="flex gap-1">
                <select
                    className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                    value={holeCards[0]}
                    onChange={e => setHoleCards(p => { const n = [...p]; n[0] = e.target.value; return n })}
                >
                    {deck.map(card => (
                        <option
                            key={card}
                            value={card}
                            disabled={holeCards.includes(card)}
                        >
                            {card}
                        </option>
                    ))}
                </select>
                <select
                    className="bg-neutral-800 px-4 py-3 rounded-sm border text-sm focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                    value={holeCards[1]}
                    onChange={e => setHoleCards(p => { const n = [...p]; n[1] = e.target.value; return n })}
                >
                    {deck.map(card => (
                        <option
                            key={card}
                            value={card}
                            disabled={holeCards.includes(card)}
                        >
                            {card}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};