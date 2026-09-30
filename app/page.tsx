import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import HowItWorks from "./components/HowItWorks";
import Contact from "./components/Contact";
import Reveal from "./components/Reveal";

export default function Home(){
	return(
		<>
			<Navbar />
			<main>
				<Hero />
				<Reveal><Services /></Reveal>
				<Reveal><WhyUs /></Reveal>
				<Reveal><HowItWorks /></Reveal>
				<Reveal><Contact /></Reveal>
			</main>
			<footer className="border-t border-line py-8 text-center text-sm text-zinc-500">
				© {new Date().getFullYear()} DeratPro.
			</footer>
		</>
	);
}