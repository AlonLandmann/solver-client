import { useState } from "react";
import LoadingDots from "./LoadingDots";

export default function AsyncButton({
    utilClasses = "",
    style = {},
    onClick,
    children,
}) {
    const [loading, setLoading] = useState(false);

    async function handleAsyncExecution(event) {
        if (!loading) {
            setLoading(true);
            await onClick(event);
        }

        setLoading(false);
    }

    return (
        <button
            className={`relative ${utilClasses}`}
            style={style}
            onClick={handleAsyncExecution}
            disabled={loading}
        >
            {loading &&
                <LoadingDots />
            }
            <div className={loading ? "opacity-0" : ""}>
                {children}
            </div>
        </button>
    );
};