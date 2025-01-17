const layout = [
    { bottom: "23%", left: "39%" },
    { bottom: "36%", left: "13%" },
    { top: "24%", left: "23%" },
    { top: "23%", right: "39%" },
    { top: "36%", right: "13%" },
    { bottom: "24%", right: "23%" },
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