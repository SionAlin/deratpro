"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
const [theme, setTheme] = useState<"dark" | "light">("dark");

useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
}, []);

const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
};

return (
    <button
    onClick={toggle}
    aria-label={theme === "dark" ? "Comută pe tema deschisă" : "Comută pe tema închisă"}
    className="rounded-md p-2 text-muted hover:text-primary"
    >
    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
);
}