import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import HowItWorks from "./components/HowItWorks";
import Contact from "./components/Contact";

export default function Home(){
	return(
		<>
			<Navbar />
			<main>
				<Hero />
				<Services />
				<WhyUs />
				<HowItWorks />
				<Contact />
			</main>
			<footer className="border-t border-line py-8 text-center text-sm text-zinc-500">
				© {new Date().getFullYear()} DeratPro.
			</footer>
		</>
	);
}