export default function Background({ width, height }) {
    return (
        <div
            className="bg-[#181818] border flex justify-center items-center"
            style={{
                width: 0.901 * width,
                height: 0.686 * height,
                borderRadius: 0.343 * height,
            }}
        >
            <div
                className="bg-[#141414] flex justify-center items-center relative"
                style={{
                    width: 0.817 * width,
                    height: 0.569 * height,
                    borderRadius: 0.284 * height,
                }}
            >
                <div
                    className="font-decorative text-neutral-800 select-none"
                    style={{
                        fontSize: 0.141 * width,
                    }}
                >
                    HT
                </div>
            </div>
        </div>
    );
};