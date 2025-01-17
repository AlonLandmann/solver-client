function divideIntoSidePots(hasFolded, mainPotShares) {
    const allPots = [];
    const remainingShares = [...mainPotShares];

    while (true) {
        let min = Infinity;
        let pot = 0;

        for (let i = 0; i < mainPotShares.length; i++) {
            if (hasFolded[i]) {
                continue;
            }
            if (0 < remainingShares[i] && remainingShares[i] < min) {
                min = remainingShares[i];
            }
        }

        if (min === Infinity) {
            break;
        }

        for (let i = 0; i < mainPotShares.length; i++) {
            const contribution = Math.min(min, remainingShares[i]);
            remainingShares[i] -= contribution;
            pot += contribution;
        }

        allPots.push(pot);
    }

    return allPots;
}

export default function Pot({ hasFolded, mainPotShares }) {
    const pots = divideIntoSidePots(hasFolded, mainPotShares);

    return (
        <div className="flex gap-8">
            {pots.map((pot, i) => (
                <div
                    key={"pot-" + i}
                    className="flex items-center gap-2 text-neutral-500"
                >
                    <i className="bi bi-database"></i>
                    <div>{pot}</div>
                </div>
            ))}
        </div>
    );
};