import { useEffect, useRef } from "react";

export default function Slider({ frequency, setFrequency }) {
    const trackRef = useRef(null);

    useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    function handleMouseDown() {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseUp() {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(e) {
        if (!trackRef.current) {
            return;
        }

        const trackRectangle = trackRef.current.getBoundingClientRect();
        const newLeft = e.clientX - trackRectangle.left;
        const newValue = Math.max(0, Math.min(1, newLeft / trackRectangle.width));

        setFrequency(Math.round(1000 * newValue));
    }

    return (
        <div className="w-full py-6 px-5 flex items-center select-none">
            <div
                ref={trackRef}
                className="relative h-1 w-full bg-neutral-600 rounded-sm grid"
                style={{
                    gridTemplateColumns: `${0.1 * frequency}% ${0.1 * (1000 - frequency)}%`,
                }}
            >
                <div className="rounded-sm" style={{ backgroundColor: `hsl(0, 0%, ${(20 + frequency * 0.07)}%` }}></div>
                <div className="rounded-sm" style={{ backgroundColor: "#282828" }}></div>
                <div
                    className="absolute -top-2 h-5 w-[6px] bg-neutral-300 cursor-pointer"
                    style={{
                        left: `calc(${0.1 * frequency}% - 3px)`
                    }}
                    onMouseDown={handleMouseDown}
                >

                </div>
            </div>
        </div>
    );
};