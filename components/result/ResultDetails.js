import { comboIndices } from "@/lib/cards";

export default function ResultDetails({ resultNode, detailedCombo }) {
    const index = comboIndices[detailedCombo];
    const frequency = resultNode.frequencies[resultNode.player][index];
    const strategy = resultNode.strategies[index];

    return (
        <div>
            Combo: {detailedCombo},
            Freq: {frequency},
            Strat: {JSON.stringify(strategy)}
        </div>
    );
};