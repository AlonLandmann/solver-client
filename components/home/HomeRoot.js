import useWindowDimensions from "@/hooks/useWindowDimensions";
import Table from "../table/Table";
import Setup from "./Setup";

export default function HomeRoot() {
    const [width, height] = useWindowDimensions();

    return (
        <div className="bg-neutral-900 min-h-screen">
            <section className="flex flex-col items-center px-10 py-16 border-b bg-neutral-800 bg-opacity-10">
                <i className="bi bi-cpu text-7xl text-neutral-600 mb-9"></i>
                <h1 className="text-5xl font-medium text-neutral-400 text-center mb-5">
                    Hold'em Solver
                </h1>
                <p className="text-xl text-neutral-300 text-center">
                    Solve any postflop spot you like. It's completely <strong>free</strong>!
                </p>
            </section>
            <section className="flex flex-col items-center gap-20 px-10 py-16 border-b">
                <Setup />
                <Table
                    availableWidth={width - 80}
                    availableHeight={height - 80}
                />
            </section>
        </div>
    );
};