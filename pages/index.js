import HomeRoot from "@/components/home/HomeRoot";
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
                <HomeRoot />
            </main>
        </>
    );
};