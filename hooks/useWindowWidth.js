import { useState, useEffect } from "react";

export default function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(0);

    function updateWidth() {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        if (window) {
            updateWidth();
            window.addEventListener("resize", updateWidth);

            return () => {
                window.removeEventListener("resize", updateWidth);
            }
        }
    }, []);

    return windowWidth;
}