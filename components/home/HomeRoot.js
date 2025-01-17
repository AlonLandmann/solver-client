export default function HomeRoot() {
    return (
        <div className="bg-neutral-900 min-h-screen">
            <section className="flex flex-col items-center py-16 px-10 border-b">
                <i className="bi bi-cpu text-7xl text-neutral-600 mb-9"></i>
                <h1 className="text-5xl font-medium text-neutral-400 mb-5">
                    Hold'em Solver
                </h1>
                <p className="text-xl text-neutral-300">
                    Solve any postflop spot you like. It's completely <strong>free</strong>!
                </p>
            </section>
            <section className="flex flex-col items-center py-16 px-10 border-b bg-neutral-800 bg-opacity-10">
                <h2 className="text-3xl text-neutral-300">
                    Game Scenario
                </h2>
            </section>
        </div>
    );
};