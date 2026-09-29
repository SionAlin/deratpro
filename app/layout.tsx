import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
	subsets: ["latin", "latin-ext"],
	variable: "--font-space"
});

export const metadata: Metadata = {
	title: "DeratPro",
	description: "Servicii autorizate de deratizare, dezinsecție si dezinfecție pentru locuințe și spații comerciale. Intervenție rapidă, garanție scrisă.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
    	<html
    		lang="ro"
    		className={space.variable}
    	>
    	<body>{children}</body>
    	</html>
	);
}
