"use client";

import { useLang } from "../lib/i18n";

export default function LangToggle() {
    const { lang, setLang } = useLang();
    return (
        <button
            onClick={() => setLang(lang === "ro" ? "en" : "ro")}
            aria-label="Change language"
            className="rounded-md px-2 py-1 text-sm font-semibold text-muted hover:text-primary"
        >
            {lang === "ro" ? "EN" : "RO"}
        </button>
    );
}