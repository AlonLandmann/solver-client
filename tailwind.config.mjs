/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                "xs": "480px",
            },
            fontFamily: {
                sans: ["Red Hat Display", "sans-serif"],
                decorative: ["Amita", "cursive"],
            },
            borderColor: {
                DEFAULT: "rgb(38, 38, 38)",
            },
            transitionProperty: {
                "width": "width",
            }
        },
    },
    plugins: [],
};
