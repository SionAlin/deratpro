"use client";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const links = [
    { href: "#servicii", label: "Servicii" },
    { href: "#de-ce", label: "De ce DeratPro?" },
    { href: "#cum-functioneaza", label: "Cum funcționează" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar(){
    const [open, setOpen] = useState(false);
    return(
        <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
                <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight">
                    <ShieldCheck className="text-primary" size={22} />
                    DERAT<span className="text-primary">PRO</span>
                </a>
                <ul className="hidden gap-8 text-sm text-zinc-300 md:flex">
                    {links.map((l) => (
                        <li key={l.href}><a href={l.href} className="hover:text-primary">{l.label}</a></li>
                    ))}
                </ul>
                <button className="md:hidden" aria-label="Meniu" onClick={() => setOpen(!open)}>
                    {open ? <X /> : <Menu />} 
                </button>
            </nav>
            {open && (
                <ul className="border-t border-line bg-bg px-5 py-3 md:hidden">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-zinc-300">{l.label}</a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}