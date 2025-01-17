import { useState, useEffect } from "react";

export default function useWindowDimensions() {
    const [dimensions, setDimensions] = useState([0, 0]);

    function updateDimensions() {
        setDimensions([window.innerWidth, window.innerHeight]);
    }

    useEffect(() => {
        if (window) {
            updateDimensions();
            window.addEventListener("resize", updateDimensions);

            return () => {
                window.removeEventListener("resize", updateDimensions);
            }
        }
    }, []);

    return dimensions;
}