"use client";
import { Rat, Bug, SprayCan } from "lucide-react";
import { useLang } from "../lib/i18n";

const icons = [Rat, Bug, SprayCan];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="servicii" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">{t.services.title}</h2>
      <p className="mt-3 max-w-xl text-muted">{t.services.subtitle}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.services.items.map((s, i) => {
          const Icon = icons[i];
          return (
            <article key={s.title} className="rounded-xl border border-line bg-surface p-6 transition hover:border-primary/60">
              <Icon className="text-primary" size={28} />
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}