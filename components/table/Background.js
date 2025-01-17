export default function Background({ tableWidth }) {
    return (
        <div
            className="bg-[#181818] border flex justify-center items-center"
            style={{
                width: 0.901 * tableWidth,
                height: 0.492 * tableWidth,
                borderRadius: 0.246 * tableWidth,
            }}
        >
            <div
                className="bg-[#141414] flex justify-center items-center relative"
                style={{
                    width: 0.817 * tableWidth,
                    height: 0.410 * tableWidth,
                    borderRadius: 0.205 * tableWidth,
                }}
            >
                <div
                    className="font-decorative text-neutral-800 select-none"
                    style={{
                        fontSize: 0.141 * tableWidth,
                    }}
                >
                    HT
                </div>
            </div>
        </div>
    );
};