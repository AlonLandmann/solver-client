import { useState } from "react";
import ResultMatrix from "./ResultMatrix";

export default function Result({ result }) {
    const [resultNode, setResultNode] = useState(result[":"]);

    return (
        <div
            className="grid gap-12"
            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
            <div className="py-6 flex flex-col">
                {resultNode.parentKey &&
                    <button
                        className="px-3 py-2 border rounded-sm text-neutral-300 cursor-pointer transition hover:text-neutral-100"
                        onClick={() => setResultNode(result[resultNode.parentKey])}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                }
                {resultNode.childKeys.map(childKey => (
                    <button
                        key={childKey}
                        className="px-3 py-2 border rounded-sm text-neutral-300 cursor-pointer transition hover:text-neutral-100"
                        onClick={() => setResultNode(result[childKey])}
                    >
                        {childKey}
                    </button>
                ))}
            </div>
            <ResultMatrix
                resultNode={resultNode}
            />
            <div className="py-6"></div>
        </div>
    );
};