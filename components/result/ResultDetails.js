import { comboIndices } from "@/lib/cards";
import Card from "../table/Card";
import StrategyPreview from "./StrategyPreview";

export default function ResultDetails({ resultNode, detailedCombo }) {
    const index = comboIndices[detailedCombo];
    const frequency = resultNode.frequencies[resultNode.player][index];
    const strategy = resultNode.strategies[index];

    return (
        <div className="flex gap-8 px-3 py-2 border rounded-sm">
            <div className="flex justify-center gap-[2px]">
                <Card card={detailedCombo.slice(0, 2)} />
                <Card card={detailedCombo.slice(2, 4)} />
            </div>
            <div className="flex gap-3 items-center">
                <div
                    className="w-[22px] h-[22px] rounded-sm"
                    style={{
                        backgroundColor: `hsl(0, 0%, ${(20 + resultNode.frequencies[resultNode.player][index] * 0.07)}%)`,
                    }}
                >

                </div>
                {frequency.toFixed(0)}
            </div>
            <div className="flex items-center gap-3">
                <StrategyPreview
                    resultNode={resultNode}
                    strategy={strategy}
                />
                <div className="flex gap-3">
                    {strategy.map((x, i) => (
                        <div key={i}>
                            {(100 * x).toFixed(1)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};