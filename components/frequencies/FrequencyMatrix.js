import useWindowWidth from "@/hooks/useWindowWidth";
import { comboIndices, deckIndices, suits, values } from "@/lib/cards";

export default function FrequencyMatrix({ spot, frequencies, setFrequencies }) {
    const windowWidth = useWindowWidth();
    const headerWidth = 30;
    const cellWidth = Math.max(4, Math.min(10, Math.floor(((windowWidth - 80) - headerWidth - 13) / 52)));
    const blockWidth = 4 * cellWidth;
    const gridWidth = 13 * (blockWidth + 1);
    const totalWidth = gridWidth + headerWidth;

    function cellStyle(v1, v2, s1, s2) {
        const card1 = v1 + s1;
        const card2 = v2 + s2;

        if (card1 === card2) {
            return "bg-neutral-950";
        }

        if (spot.board.includes(card1) || spot.board.includes(card2)) {
            return "bg-neutral-950";
        }

        const combo = deckIndices[card1] < deckIndices[card2] ? card1 + card2 : card2 + card1;
        const index = comboIndices[combo];

        if (frequencies[index] === 0) {
            return "bg-neutral-900";
        }

        return "bg-neutral-950";
    }

    return (
        <div
            className="grid"
            style={{
                width: totalWidth,
                height: totalWidth,
                gridTemplateColumns: `${headerWidth}px 1fr`,
                gridTemplateRows: `${headerWidth}px 1fr`,
            }}
        >
            <div className="border"></div>
            <div className="flex">
                {values.map(value => (
                    <div
                        key={"top-header-" + value}
                        className="border-r border-t border-b flex justify-center items-center text-sm text-neutral-500"
                        style={{
                            width: blockWidth + 1,
                            height: headerWidth,
                        }}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                {values.map(value => (
                    <div
                        key={"top-header-" + value}
                        className="border-b border-l border-r flex justify-center items-center text-sm text-neutral-500"
                        style={{
                            width: headerWidth,
                            height: blockWidth + 1,
                        }}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div
                className="bg-[#222] border-b border-r grid gap-[1px]"
                style={{
                    width: gridWidth,
                    height: gridWidth,
                    gridTemplateColumns: `repeat(13, ${blockWidth}px)`,
                }}
            >
                {values.map(v1 => (
                    values.map(v2 => (
                        <div
                            key={"block-" + v1 + v2}
                            className="grid"
                            style={{
                                width: blockWidth,
                                height: blockWidth,
                                gridTemplateColumns: `repeat(4, ${cellWidth}px)`
                            }}
                        >
                            {suits.map(s1 => (
                                suits.map(s2 => (
                                    <div
                                        key={"cell-" + v1 + v2 + s1 + s2}
                                        className={cellStyle(v1, v2, s1, s2)}
                                        style={{
                                            width: cellWidth,
                                            height: cellWidth,
                                        }}
                                    >

                                    </div>
                                ))
                            ))}
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
};