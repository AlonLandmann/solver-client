import Background from "./Background";
import Board from "./Board";
import CommittedChips from "./CommittedChips";
import DealerButton from "./DealerButton";
import Pot from "./Pot";
import Seat from "./Seat";

export default function Table() {
    const tableWidth = 710;
    const tableHeight = 510;

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
            style={{
                width: tableWidth,
                height: tableHeight,
            }}
        >
            <Background
                tableWidth={tableWidth}
            />
            <DealerButton
                tableWidth={tableWidth}
                heroPosition={heroPosition}
            />
            <div className="absolute flex flex-col items-center gap-1 mt-7">
                <Board
                    tableWidth={tableWidth}
                    board={board}
                />
                <Pot
                    hasFolded={hasFolded}
                    mainPotShares={mainPotShares}
                />
            </div>
            {Array(6).fill(null).map((_, i) => (
                <Seat
                    key={"seat-" + i}
                    tableWidth={tableWidth}
                    heroPosition={heroPosition}
                    seatOffset={i}
                    holeCards={i === 0 ? holeCards : null}
                    hasFolded={hasFolded}
                    lastActions={lastActions}
                    stacks={stacks}
                />
            ))}
            {Array(6).fill(null).map((_, i) => (
                <CommittedChips
                    key={"chips-" + i}
                    tableWidth={tableWidth}
                    heroPosition={heroPosition}
                    seatOffset={i}
                    committed={committed}
                />
            ))}
        </div>
    );
};