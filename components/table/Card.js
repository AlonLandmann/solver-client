import { scaleTableStyle } from "@/lib/scaling";

function suitBackground(suit) {
    const map = {
        "s": "#151515",
        "h": "#6c3b3b",
        "d": "#2e6067",
        "c": "#3a6e48",
    };

    return map[suit];
}

function suitIcon(suit) {
    const map = {
        "s": "spade",
        "h": "heart",
        "d": "diamond",
        "c": "club",
    };

    return `bi bi-suit-${map[suit]}-fill`;
}

export default function Card({ tableWidth = 710, card }) {
    return (
        <div
            className="relative flex justify-center items-center rounded-[3px] text-neutral-400 overflow-hidden"
            style={{
                width: scaleTableStyle(33, tableWidth, 0.5),
                height: scaleTableStyle(50, tableWidth, 0.5),
                fontSize: scaleTableStyle(20, tableWidth, 0.5, 10),
                background: card
                    ? suitBackground(card[1])
                    : "repeating-linear-gradient(-45deg, #888, #888 4px, #555 4px, #555 8px)",
            }}
        >
            {card && card[0]}
            {card &&
                <div
                    className={`
                        absolute text-5xl
                        ${card[1] === "s" ? "opacity-5" : "opacity-15"}
                    `}
                    style={{
                        top: scaleTableStyle(15, tableWidth, 0.5),
                        left: scaleTableStyle(5, tableWidth, 0.5),
                    }}
                >
                    <i className={suitIcon(card[1])}></i>
                </div>
            }
        </div>
    );
};