import { Zap, ShieldCheck, BadgeCheck, Award } from "lucide-react";

const items = [
    { icon: Zap, title: "Intervenție rapidă", text: "Ajungem la tine în maximum 24 de ore." },
    { icon: ShieldCheck, title: "Substanțe avizate", text: "Produse biocide autorizate, sigure pentru oameni și animale." },
    { icon: BadgeCheck, title: "Personal autorizat", text: "Tehnicieni instruiți și certificați." },
    { icon: Award, title: "Garanție scrisă", text: "Revenim gratuit dacă problema reapare." }
];

export default function WhyUs(){
    return (
        <section id="de-ce" className="border-y border-line bg-surface/40">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <h2 className="text-3xl font-bold sm:text-4xl">De ce <span className="text-primary">DeratPro</span>?</h2>
                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map(({icon: Icon, title, text }) => (
                        <div key={title}>
                            <Icon className="text-primary" size={26} />
                            <h3 className="mt-3 font-semibold">{title}</h3>
                            <p className="mt-1 text-sm text-zinc-400">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}