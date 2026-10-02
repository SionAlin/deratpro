"use client"

import { Zap, ShieldCheck, BadgeCheck, Award } from "lucide-react";
import { useLang } from "../lib/i18n";
import Reveal from "./Reveal";


const icons = [Zap, ShieldCheck, BadgeCheck, Award];

export default function WhyUs(){
    const { t } = useLang();

    return (
        <section id="de-ce" className="border-y border-line bg-surface/40">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <Reveal>
                    <h2 className="text-3xl font-bold sm:text-4xl"> {t.why.title}{" "} <span className="text-primary">DeratPro</span>?</h2>
                </Reveal>
                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {t.why.items.map((item, i) => {
                        const Icon = icons[i];
                        return (
                            <Reveal key={item.title} delay={i*100}>
                                <div className="group">
                                    <Icon className="text-primary transition-transform duration-300 group-hover:-translate-y-1" size={26} />
                                    <h3 className="mt-3 font-semibold">{item.title}</h3>
                                    <p className="mt-1 text-sm text-muted">{item.text}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}