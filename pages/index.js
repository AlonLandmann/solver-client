import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Hold'em Trainer Solver</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div className="bg-neutral-900 min-h-screen">
                    Hello world!
                </div>
            </main>
        </>
    );
};