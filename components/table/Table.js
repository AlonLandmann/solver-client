import Seat from "./Seat";
import TableCenter from "./TableCenter";
import TableMain from "./TableMain";

export default function Table() {
    const width = 710;
    const height = 510;
    const heroPosition = 4;
    const holeCards = ["Ad", "Kd"];
    const board = [];
    const hasFolded = [false, false, true, true, false, false];
    const lastActions = ["sb", "bb", "fold", "fold", null, null];
    const stacks = [99, 98, 100, 100, 100, 100];
    const committed = [1, 2, 0, 0, 0, 0];
    const mainPotShares = [0, 0, 0, 0, 0, 0];

    return (
        <div
            className="relative flex justify-center items-center"
            style={{ width, height }}
        >
            <TableMain
                width={width}
                height={height}
                heroPosition={heroPosition}
                committed={committed}
            />
            <TableCenter
                board={board}
                mainPotShares={mainPotShares}
            />
            {Array(6).fill(null).map((_, i) => (
                <Seat
                    key={"seat-" + i}
                    heroPosition={heroPosition}
                    seatOffset={i}
                    holeCards={i === 0 ? holeCards : null}
                    hasFolded={hasFolded}
                    lastActions={lastActions}
                    stacks={stacks}
                />
            ))}
        </div>
    );
};