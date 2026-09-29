const steps = [
    { title: "Ne suni", text: "Ne descrii problema și stabilim o vizită." },
    { title: "Evaluare", text: "Inspectăm spațiul și îți dăm o ofertă clară." },
    { title: "Intervenție", text: "Tratăm, apoi verificăm rezultatul și îți dăm garanția." },
];

export default function HowItWorks(){
    return (
        <section id="cum-functioneaza" className="mx-auto max-w-6xl px-5 py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Cum funcționează?</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
                {steps.map((s, i) => (
                    <li key={s.title} className="rounded-xl border border-line p-6">
                        <span className="text-4xl font-bold text-primary">{i + 1}</span>
                        <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400">{s.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}