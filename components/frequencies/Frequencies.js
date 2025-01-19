import FrequencyMatrix from "./FrequencyMatrix";

export default function Frequncies({ spot, frequencies, setFrequencies }) {
    return (
        <div>
            <FrequencyMatrix
                spot={spot}
                frequencies={frequencies[0]}
                setFrequencies={setFrequencies}
            />
        </div>
    );
};