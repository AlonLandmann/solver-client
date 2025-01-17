import Card from "./Card";

export default function Board({ board }) {
    if (board.length === 0) {
        return null;
    }

    return (
        <div className="rounded-[3px] p-1 flex gap-1 bg-[#11111188]">
            {board.map(card => (
                <Card
                    key={card}
                    card={card}
                />
            ))}
        </div>
    );
};