import { Rat, Bug, SprayCan } from "lucide-react";

const services = [
    { icon: Rat, title: "Deratizare", text: "Eliminăm rozătoarele din locuințe, depozite și restaurante, cu stații sigure și monitorizare periodică." },
    { icon: Bug, title: "Dezinsecție", text: "Tratamente împotriva gândacilor, ploșnițelor, furnicilor și țânțarilor, cu rezultate rapide." },
    { icon: SprayCan, title: "Dezinfecție", text: "Igienizare antibacteriană și antivirală pentru birouri, clinici și spații cu trafic mare." },
];

export default function Services(){
    return (
        <section id="servicii" className="mx-auto max-w-6xl px-5 py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Servicii</h2>
            <p className="mt-3 max-w-xl text-zinc-400">Trei tipuri de intervenție, pentru clienți casnici și companii.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {services.map(({ icon: Icon, title, text}) => (
                    <article key={title} className="rounded-xl border border-line bg-surface p-6 transition hover:border-primary/60">
                        <Icon className="text-primary" size={28} />
                        <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}