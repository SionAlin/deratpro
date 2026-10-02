"use client";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { useLang } from "../lib/i18n";

const links = [
    { href: "#servicii", key: "services" },
    { href: "#de-ce", key: "why" },
    { href: "#cum-functioneaza", key: "how" },
    { href: "#contact", key: "contact" },
];

export default function Navbar(){
    const [open, setOpen] = useState(false);
    const { t } = useLang();

    return(
        <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
                <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
                    <Image src="/DeratproLogo.png" alt="DeratPro logo" width={64} height={64} />
                    DERAT<span className="text-primary">PRO</span>
                </a>
                
                <ul className="hidden gap-8 text-sm text-muted md:flex">
                    {links.map((l) => (
                        <li key={l.href}><a href={l.href} className="hover:text-primary">{t.nav[l.key]}</a></li>
                    ))}
                </ul>
                <div className="flex items-center gap-1">
                    <LangToggle />
                    <ThemeToggle />
                    <button className="p-2 md:hidden" aria-label={t.nav.menu} onClick={() => setOpen(!open)}>
                        {open ? <X /> : <Menu />} 
                    </button>
                </div>
            </nav>
            {open && (
                <ul className="border-t border-line bg-bg px-5 py-3 md:hidden">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-muted">{t.nav[l.key]}</a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}