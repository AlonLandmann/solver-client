import Card from "./Card";

const positions = ["SB", "BB", "UTG", "HJ", "CO", "BTN"];

const layout = [
    { bottom: "15px", left: "50%", transform: "translateX(-50%)" },
    { bottom: "60px", left: "45px" },
    { top: "60px", left: "45px" },
    { top: "15px", left: "50%", transform: "translateX(-50%)" },
    { top: "60px", right: "45px" },
    { bottom: "60px", right: "45px" },
];

export default function Seat({ heroPosition, seatOffset, holeCards, hasFolded, lastActions, stacks }) {
    const p = (heroPosition + seatOffset) % 6;
    
    return (
        <div
            className="absolute flex flex-col items-center gap-[1px] z-10"
            style={{ 
                ...layout[seatOffset],
                fontSize: "14px",
            }}
        >
            <div className="text-neutral-500">
                {positions[p]}
            </div>
            <div className={`flex justify-center gap-[2px] ${hasFolded[p] ? "opacity-10" : ""}`}>
                <Card card={holeCards ? holeCards[0] : null} />
                <Card card={holeCards ? holeCards[1] : null} />
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