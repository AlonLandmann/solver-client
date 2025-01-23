import { scaleTableStyle } from "@/lib/scaling";
import Card from "./Card";

const positions = ["SB", "BB", "UTG", "HJ", "CO", "BTN"];

export default function Seat({ tableWidth, heroPosition, seatOffset, holeCards, hasFolded, lastActions, stacks, actingPlayer }) {
    const p = (heroPosition + seatOffset) % 6;

    const horizontal = scaleTableStyle(45, tableWidth, 2, 0);
    const vertical1 = scaleTableStyle(60, tableWidth, 2, 0);
    const vertical2 = scaleTableStyle(15, tableWidth, 3.2, 0);

    const layout = [
        { bottom: vertical2, left: "50%", transform: "translateX(-50%)" },
        { bottom: vertical1, left: horizontal },
        { top: vertical1, left: horizontal },
        { top: vertical2, left: "50%", transform: "translateX(-50%)" },
        { top: vertical1, right: horizontal },
        { bottom: vertical1, right: horizontal },
    ];

    return (
        <div
            className={`absolute px-1 flex flex-col items-center gap-[1px] z-10 border rounded-sm self-stretch text-center ${p === actingPlayer ? "border-pink-600" : "border-neutral-900"}`}
            style={{
                ...layout[seatOffset],
                fontSize: scaleTableStyle(14, tableWidth, 0.5, 10),
            }}
        >
            <div className={`text-neutral-500 `}>
                {positions[p]}
            </div>
            <div className={`flex justify-center gap-[2px] ${hasFolded[p] ? "opacity-10" : ""}`}>
                <Card
                    tableWidth={tableWidth}
                    card={holeCards ? holeCards[0] : null}
                />
                <Card
                    tableWidth={tableWidth}
                    card={holeCards ? holeCards[1] : null}
                />
            </div>
            <div className="text-neutral-500 truncate">
                {stacks[p]}
                {lastActions[p] &&
                    <span> | {lastActions[p]}</span>
                }
            </div>
        </div>
    );
};