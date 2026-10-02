"use client"

import { useLang } from "../lib/i18n";
import Reveal from "./Reveal";

export default function HowItWorks(){
    
    const { t } = useLang();
    
    return (
        <section id="cum-functioneaza" className="mx-auto max-w-6xl px-5 py-24">
            <Reveal>
                <h2 className="text-3xl font-bold sm:text-4xl">{t.how.title}</h2>
            </Reveal>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
                {t.how.steps.map((s, i) => (
                    <Reveal key={s.title} delay={i*120}>
                        <li className="group rounded-xl border border-line p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60 hover:bg-surface">
                            <span className="text-4xl font-bold text-primary transition-transform duration-300 inline-block group-hover:scale-110">{i + 1}</span>
                            <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{s.text}</p>
                        </li>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}