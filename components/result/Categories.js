import { categorize, categorizePreflop, retrieveInOrder, retrievePreflopInOrder } from "@/lib/categories";
import { useState } from "react";
import Category from "./Category";
import { produce } from "immer";

export default function Categories({ resultNode, setHovered }) {
    const [detailsInView, setDetailsInView] = useState({ "1 pair": false, "High Card": false });
    const categories = resultNode.street === 0 ? categorizePreflop(resultNode) : categorize(resultNode);
    const total = categories && categories.allStrats.reduce((acc, curr) => (acc + curr), 0);

    function getFraction(frequencyTotals) {
        const localTotal = frequencyTotals.reduce((acc, curr) => (acc + curr), 0);
        return localTotal / total;
    }

    function getStrategy(frequencyTotals) {
        const localTotal = frequencyTotals.reduce((acc, curr) => (acc + curr), 0);
        return frequencyTotals.map(fT => (fT / localTotal));
    }

    function inOrder(type, strength) {
        if (resultNode.street === "preflop") {
            return retrievePreflopInOrder(categories, type);
        } else {
            return retrieveInOrder(categories, type, strength);
        }
    }

    function handleToggleDetails(strength) {
        setDetailsInView(produce(draft => {
            draft[strength] = !draft[strength];
        }));
    }

    return !categories ? null : (
        <div className="border rounded py-3 px-4 text-neutral-400">
            <div className="pb-1 text-neutral-400">
                Categories
            </div>
            <div
                className={resultNode.street !== "preflop" ? "grid gap-1" : ""}
                style={{ gridTemplateColumns: "1fr 30px" }}
            >
                <Category
                    resultNode={resultNode}
                    comboArray={categories.all}
                    name="All"
                    fraction={getFraction(categories.allStrats)}
                    strategy={getStrategy(categories.allStrats)}
                    setHovered={setHovered}
                />
            </div>
            <div className="pt-4 pb-1 text-neutral-400">
                Strength
            </div>
            <div className="flex flex-col">
                {inOrder("strengths").map(strength => (
                    <div key={"strength" + strength}>
                        <div
                            className={resultNode.street !== "preflop" ? "grid gap-1" : ""}
                            style={{ gridTemplateColumns: "1fr 30px" }}
                        >
                            <Category
                                resultNode={resultNode}
                                comboArray={categories.strengths[strength]}
                                name={strength}
                                fraction={getFraction(categories.strengthStrats[strength])}
                                strategy={getStrategy(categories.strengthStrats[strength])}
                                setHovered={setHovered}
                            />
                            {["1 Pair", "High Card"].includes(strength) &&
                                <button
                                    className="text-neutral-400 transition hover:text-white"
                                    onClick={() => handleToggleDetails(strength)}
                                >
                                    <i className={`bi bi-${detailsInView[strength] ? "chevron-down" : "chevron-left"}`}></i>
                                </button>
                            }
                        </div>
                        {detailsInView[strength] &&
                            <div className="flex flex-col mt-[2px] ml-4 mb-1 py-1">
                                {inOrder("details", strength).map(detail => (
                                    <div key={"detail" + strength + detail}>
                                        <Category
                                            resultNode={resultNode}
                                            comboArray={categories.details[strength][detail]}
                                            name={detail}
                                            fraction={getFraction(categories.detailStrats[strength][detail])}
                                            strategy={getStrategy(categories.detailStrats[strength][detail])}
                                            setHovered={setHovered}
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                ))}
            </div>
            {(resultNode.street == "preflop" || [3, 4].includes(resultNode.board.length)) &&
                <>
                    <div className="pt-4 pb-1 text-neutral-400">
                        Draws
                    </div>
                    <div className="flex flex-col">
                        {inOrder("draws").map(draw => (
                            <div
                                key={"draw" + draw}
                                className={resultNode.street !== "preflop" ? "grid gap-1" : ""}
                                style={{ gridTemplateColumns: "1fr 30px" }}
                            >
                                <Category
                                    resultNode={resultNode}
                                    comboArray={categories.draws[draw]}
                                    name={draw}
                                    fraction={getFraction(categories.drawStrats[draw])}
                                    strategy={getStrategy(categories.drawStrats[draw])}
                                    setHovered={setHovered}
                                />
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
};