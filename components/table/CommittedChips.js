const layout = [
    { bottom: "23%", left: "50%", justifyContent: "center", transform: "translateX(-50%)" },
    { bottom: "30%", left: "16%", justifyContent: "flex-start" },
    { top: "30%", left: "16%", justifyContent: "flex-start" },
    { top: "23%", left: "50%", justifyContent: "center", transform: "translateX(-50%)" },
    { top: "30%", right: "16%", justifyContent: "flex-end" },
    { bottom: "30%", right: "16%", justifyContent: "flex-end" },
];

export default function CommittedChips({ heroPosition, seatOffset, committed }) {
    const p = (heroPosition + seatOffset) % 6;

    if (committed[p] === 0) {
        return null;
    }

    return (
        <div
            className="absolute h-[30px] flex items-center gap-2 text-neutral-500"
            style={{
                ...layout[seatOffset],
                fontSize: "15px",
            }}
        >
            <i className="bi bi-database"></i>
            <div>
                {committed[p]}
            </div>
        </div>
    );
};