const layout = [
    { bottom: "3%", left: "37%" },
    { bottom: "26%", left: "5%" },
    { top: "5%", left: "18%" },
    { top: "3%", left: "37%" },
    { top: "26%", right: "5%" },
    { bottom: "5%", right: "18%" },
];

export default function DealerButton({ heroPosition }) {
    return (
        <div
            className="absolute border rounded-full flex justify-center items-center text-neutral-400 bg-[#181818] select-none"
            style={{
                ...layout[(5 - heroPosition) % 6],
                width: "30px",
                height: "30px",
                fontSize: "14px",
            }}
        >
            D
        </div>
    );
};