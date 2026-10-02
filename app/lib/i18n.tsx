"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ro = {
    nav: { services: "Servicii", why: "De ce DeratPro", how: "Cum funcționează", contact: "Contact", menu: "Meniu", },
    hero: {
        badge: "Servicii autorizate DDD",
        title: "Scapă definitiv de dăunători cu",
        text: "Deratizare, dezinsecție și dezinfecție pentru locuințe și spații comerciale. Intervenție rapidă, substanțe avizate, garanție scrisă.",
        cta: "Solicită ofertă",
        stats: [
            { value: "15+", label: "ani experiență" },
            { value: "10.000+", label: "intervenții" },
            { value: "100%", label: "garanție scrisă" },
        ],
    },
    services: {
        title: "Servicii",
        subtitle: "Trei tipuri de intervenție, pentru clienți casnici și companii.",
        items: [
            { title: "Deratizare", text: "Eliminăm rozătoarele din locuințe, depozite și restaurante, cu stații sigure și monitorizare periodică." },
            { title: "Dezinsecție", text: "Tratamente împotriva gândacilor, ploșnițelor, furnicilor și țânțarilor, cu rezultate rapide." },
            { title: "Dezinfecție", text: "Igienizare antibacteriană și antivirală pentru birouri, clinici și spații cu trafic mare." },
        ],
    },
    why: {
        title: "De ce",
        items: [
            { title: "Intervenție rapidă", text: "Ajungem la tine în maximum 24 de ore." },
            { title: "Substanțe avizate", text: "Produse biocide autorizate, sigure pentru oameni și animale." },
            { title: "Personal autorizat", text: "Tehnicieni instruiți și certificați." },
            { title: "Garanție scrisă", text: "Revenim gratuit dacă problema reapare." },
        ],
    },
    how: {
        title: "Cum funcționează?",
        steps: [
            { title: "Ne suni", text: "Ne descrii problema și stabilim o vizită." },
            { title: "Evaluare", text: "Inspectăm spațiul și îți dăm o ofertă clară." },
            { title: "Intervenție", text: "Tratăm, apoi verificăm rezultatul și îți dăm garanția." },
        ],
    },
    contact: {
        title: "Cere o ofertă",
        name: "Nume",
        phone: "Telefon",
        message: "Mesaj",
        submit: "Trimite",
        success: "Mulțumim! Te vom contacta în curând.",
        submitError: "Nu s-a putut trimite mesajul. Încearcă din nou.",
        errors: {
            name: "Introdu numele tău.",
            phone: "Introdu un număr de telefon valid.",
            message: "Mesajul trebuie să aibă cel puțin 10 caractere.",
        },
    },
};

const en: typeof ro = {
    nav: { services: "Services", why: "Why DeratPro", how: "How it works", contact: "Contact", menu: "Menu", },
    hero: {
        badge: "Licensed pest control",
        title: "Get rid of pests for good with",
        text: "Rodent, insect and disinfection services for homes and businesses. Fast response, approved products, written guarantee.",
        cta: "Get a quote",
        stats: [
            { value: "15+", label: "years of experience" },
            { value: "10,000+", label: "interventions" },
            { value: "100%", label: "written guarantee" },
        ],
    },
    services: {
        title: "Services",
        subtitle: "Three types of intervention, for homes and businesses.",
        items: [
            { title: "Rodent control", text: "We remove rodents from homes, warehouses and restaurants, with safe bait stations and regular monitoring." },
            { title: "Insect control", text: "Treatments against cockroaches, bed bugs, ants and mosquitoes, with fast results." },
            { title: "Disinfection", text: "Antibacterial and antiviral sanitizing for offices, clinics and high-traffic spaces." },
        ],
    },
    why: {
        title: "Why",
        items: [
            { title: "Fast response", text: "We reach you within 24 hours at most." },
            { title: "Approved products", text: "Licensed biocides, safe for people and pets." },
            { title: "Licensed staff", text: "Trained and certified technicians." },
            { title: "Written guarantee", text: "We come back free of charge if the problem returns." },
        ],
    },
    how: {
        title: "How does it work?",
        steps: [
            { title: "You call us", text: "You describe the problem and we schedule a visit." },
            { title: "Assessment", text: "We inspect the space and give you a clear quote." },
            { title: "Treatment", text: "We treat the problem, check the result and give you the guarantee." },
        ],
    },
    contact: {
        title: "Request a quote",
        name: "Name",
        phone: "Phone",
        message: "Message",
        submit: "Send",
        success: "Thank you! We will contact you shortly.",
        submitError: "The message could not be sent. Please try again.",
        errors: {
            name: "Enter your name.",
            phone: "Enter a valid phone number.",
            message: "The message must be at least 10 characters long.",
        },
    },
};

const dicts = { ro, en };
type Lang = keyof typeof dicts;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: typeof ro }>({
    lang: "ro", setLang: () => {}, t: ro,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("ro");

    useEffect(() => {
        try {
        const saved = localStorage.getItem("lang");
        if (saved === "ro" || saved === "en") setLangState(saved);
        } catch {}
    }, []);

    useEffect(() => { document.documentElement.lang = lang; }, [lang]);

    const setLang = (l: Lang) => {
        setLangState(l);
        try { localStorage.setItem("lang", l); } catch {}
    };

    return <Ctx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);