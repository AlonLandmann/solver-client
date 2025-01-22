import { optionColor } from "@/lib/colors";

export default function StrategyPreview({ resultNode, strategy }) {
    return (
        <div
            className="border flex items-end"
            style={{
                width: strategy.length * 8 + 2,
                height: 22,
            }}
        >
            {strategy.map((prob, i) => (
                <div
                    key={"option-" + i}
                    style={{
                        width: 8,
                        height: prob * 20,
                        background: optionColor(
                            resultNode.actions[i],
                            resultNode.toCall,
                            resultNode.potBeforeCall,
                        ),
                    }}
                >

                </div>
            ))}
        </div>
    );
};