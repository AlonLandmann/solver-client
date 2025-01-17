import Card from "./Card";

export default function TableCenter({ board, mainPotShares }) {
    if (board.length === 0) {
        return null;
    }

    return (
        <div className="absolute z-10 rounded-[3px] p-1 flex gap-1 bg-[#11111188]">
            {board.map(card => (
                <Card key={card} card={card} />
            ))}
            <div
                className="absolute top-full mt-1 left-1/2 -translate-x-1/2 flex items-center gap-2 text-neutral-500"
                style={{
                    fontSize: "15px",
                }}
            >
                <i className="bi bi-database"></i>
                <div>
                    {mainPotShares.reduce((sum, share) => (sum + share), 0)}
                </div>
            </div>
        </div>
    );
};