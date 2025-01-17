import { scaleTableStyle } from "@/lib/scaling";

const layout = [
    { bottom: "23%", left: "39%" },
    { bottom: "36%", left: "13%" },
    { top: "24%", left: "23%" },
    { top: "23%", right: "39%" },
    { top: "36%", right: "13%" },
    { bottom: "24%", right: "23%" },
];

export default function DealerButton({ heroPosition, tableWidth }) {
    return (
        <div
            className="absolute border rounded-full flex justify-center items-center text-neutral-400 bg-[#181818] select-none"
            style={{
                ...layout[(5 - heroPosition) % 6],
                width: scaleTableStyle(30, tableWidth, 0.75),
                height: scaleTableStyle(30, tableWidth, 0.75),
                fontSize: scaleTableStyle(14, tableWidth, 0.75, 10),
            }}
        >
            D
        </div>
    );
};