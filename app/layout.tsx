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
	icons: {
		icon: "/DeratproLogo.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
    	<html
    		lang="ro"
    		className={space.variable}
			suppressHydrationWarning
    	>
		<head>
			<script
			dangerouslySetInnerHTML={{
				__html: `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){}`,
			}}
			/>
		</head>
    	<body>{children}</body>
    	</html>
	);
}
