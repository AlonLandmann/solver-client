import ResultMatrix from "./ResultMatrix";

export default function Result({ spot, frequencies, result }) {
    return (
        <div
            className="grid gap-12"
            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
            <div className="py-6"></div>
            <ResultMatrix
                spot={spot}
                frequencies={frequencies}
                result={result}
            />
            <div className="py-6"></div>
        </div>
    );
};