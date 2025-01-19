import useWindowWidth from "@/hooks/useWindowWidth";
import Background from "./Background";
import Board from "./Board";
import CommittedChips from "./CommittedChips";
import DealerButton from "./DealerButton";
import Pot from "./Pot";
import Seat from "./Seat";

export default function Table({ setup, spot }) {
    const windowWidth = useWindowWidth();
    const tableWidth = Math.max(400, Math.min(710, windowWidth - 80));

    return (
        <div
            className="relative flex justify-center items-center"
            style={{
                width: tableWidth,
                height: (510 / 710) * tableWidth,
            }}
        >
            <Background
                tableWidth={tableWidth}
            />
            <DealerButton
                tableWidth={tableWidth}
                heroPosition={setup.heroPosition}
            />
            <div className="absolute flex flex-col items-center gap-1 mt-7">
                <Board
                    tableWidth={tableWidth}
                    board={spot.board}
                />
                <Pot
                    tableWidth={tableWidth}
                    hasFolded={spot.hasFolded}
                    mainPotShares={spot.mainPotShares}
                />
            </div>
            {Array(6).fill(null).map((_, i) => (
                <Seat
                    key={"seat-" + i}
                    tableWidth={tableWidth}
                    heroPosition={setup.heroPosition}
                    seatOffset={i}
                    holeCards={i === 0 ? setup.holeCards : null}
                    hasFolded={spot.hasFolded}
                    lastActions={spot.lastActions}
                    stacks={spot.stacks}
                />
            ))}
            {Array(6).fill(null).map((_, i) => (
                <CommittedChips
                    key={"chips-" + i}
                    tableWidth={tableWidth}
                    heroPosition={setup.heroPosition}
                    seatOffset={i}
                    committed={spot.committed}
                />
            ))}
        </div>
    );
};