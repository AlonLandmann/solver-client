import Card from "./Card";

export default function Board({ tableWidth, board }) {
    if (board.length === 0) {
        return null;
    }

    return (
        <div className="rounded-[3px] p-1 flex gap-1 bg-[#11111188]">
            {board.map(card => (
                <Card
                    tableWidth={tableWidth}
                    key={card}
                    card={card}
                />
            ))}
        </div>
    );
};