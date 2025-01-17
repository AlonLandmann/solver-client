const layout = [
    { bottom: "3%", left: "50%", transform: "translateX(-50%)" },
    { bottom: "14%", left: "10%" },
    { top: "14%", left: "10%" },
    { top: "3%", left: "50%", transform: "translateX(-50%)" },
    { top: "14%", right: "10%" },
    { bottom: "14%", right: "10%" },
];

export default function CommittedChips({ heroPosition, seatOffset, committed }) {
    const p = (heroPosition + seatOffset) % 6;

    if (committed[p] === 0) {
        return null;
    }

    return (
        <div
            className="absolute h-[30px] w-[30px] flex justify-center items-center gap-2 text-neutral-500"
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