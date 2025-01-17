function suitBackground(suit) {
    const map = {
        "s": "#151515",
        "h": "#6c3b3b",
        "d": "#2e6067",
        "c": "#3a6e48",
    };

    return `bg-[${map[suit]}]`;
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

export default function Card({ card }) {
    return (
        <div
            className={`
                relative flex justify-center items-center rounded-[3px] text-neutral-400 overflow-hidden
                ${card
                    ? suitBackground(card[1])
                    : "bg-[repeating-linear-gradient(-45deg,_#888,_#888_4px,_#555_4px,_#555_8px)]"
                }
            `}
            style={{
                width: "33px",
                height: "50px",
                fontSize: "20px",
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
                        top: "15px",
                        left: "5px",
                    }}
                >
                    <i className={suitIcon(card[1])}></i>
                </div>
            }
        </div>
    );
};