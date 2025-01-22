import StrategyPreview from "./StrategyPreview";

export default function Category({ resultNode, comboArray, name, fraction, strategy, setHovered }) {
    return (
        <div
            className="h-8 py-[2px] flex items-center gap-[2px]"
            onMouseEnter={() => setHovered(comboArray)}
            onMouseLeave={() => setHovered([])}
        >
            <div className="min-w-16 sm:min-w-24 pl-[6px] pr-[3px] text-nowrap">
                {name}
            </div>
            <div className='min-w-16 sm:min-w-20 ml-auto pl-[3px] pr-[6px] text-right'>
                {(100 * fraction).toFixed(1)} %
            </div>
            <StrategyPreview
                resultNode={resultNode}
                strategy={strategy}
            />
        </div>
    );
};