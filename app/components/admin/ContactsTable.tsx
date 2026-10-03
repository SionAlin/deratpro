"use client";
import { useState } from "react";
import { STATUSES, STATUS_KEYS, NOTES_MAX, type StatusKey } from "../../lib/statuses";

export type ContactRow = {
id: number;
name: string;
phone: string;
message: string;
created_at: string;
status: string;
notes: string | null;
};

function Row({ c }: { c: ContactRow }) {
const [saved, setSaved] = useState({ status: c.status, notes: c.notes ?? "" });
const [status, setStatus] = useState(c.status);
const [notes, setNotes] = useState(c.notes ?? "");
const [state, setState] = useState<"idle" | "saving" | "ok" | "error">("idle");

const dirty = status !== saved.status || notes.trim() !== saved.notes;
const badge = STATUSES[status as StatusKey]?.className ?? "bg-zinc-500/15 text-muted";

const save = async () => {
    setState("saving");
    try {
        const res = await fetch(`/api/admin/contacts/${c.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, notes }),
        });
        if (res.status === 401) {
            window.location.href = "/admin/login";
            return;
        }
        if (!res.ok) throw new Error();
        setSaved({ status, notes: notes.trim() });
        setNotes(notes.trim());
        setState("ok");
    } catch {
        setState("error");
    }
};

return (
    <tr className="border-b border-line align-top last:border-0">
    <td className="whitespace-nowrap px-4 py-3 text-muted">
        {new Date(c.created_at).toLocaleString("ro-RO", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Bucharest",
        })}
    </td>
    <td className="px-4 py-3 font-medium">{c.name}</td>
    <td className="whitespace-nowrap px-4 py-3">
        <a href={`tel:${c.phone}`} className="hover:text-primary">{c.phone}</a>
    </td>
    <td className="max-w-xs px-4 py-3 text-muted">
        <p className="line-clamp-2" title={c.message}>{c.message}</p>
    </td>
    <td className="px-4 py-3">
        <select
        value={status}
        onChange={(e) => { setStatus(e.target.value); setState("idle"); }}
        className={`rounded-full border border-line px-2.5 py-1 text-xs font-semibold outline-none ${badge}`}
        >
        {STATUS_KEYS.map((k) => (
            <option key={k} value={k} className="bg-surface text-fg">{STATUSES[k].label}</option>
        ))}
        </select>
    </td>
    <td className="px-4 py-3">
        <textarea
        value={notes}
        onChange={(e) => { setNotes(e.target.value); setState("idle"); }}
        maxLength={NOTES_MAX}
        rows={2}
        placeholder="Adaugă o notiță..."
        className="w-56 rounded-md border border-line bg-bg px-2 py-1 text-sm outline-none focus:border-primary"
        />
        <div className="mt-1 flex items-center gap-3 text-xs">
        <button
            onClick={save}
            disabled={!dirty || state === "saving"}
            className="rounded-md bg-primary px-3 py-1 font-semibold text-black disabled:opacity-40"
        >
            {state === "saving" ? "Se salvează..." : "Salvează"}
        </button>
        {state === "ok" && !dirty && <span className="text-green-600">Salvat</span>}
        {state === "error" && <span className="text-red-500">Eroare, încearcă din nou</span>}
        </div>
    </td>
    </tr>
);
}

export default function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
    <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="border-b border-line text-muted">
        <tr>
            {["Data", "Nume", "Telefon", "Mesaj", "Status", "Notiță"].map((h) => (
            <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {contacts.length === 0 && (
            <tr>
            <td colSpan={6} className="px-4 py-10 text-center text-muted">Nicio cerere încă.</td>
            </tr>
        )}
        {contacts.map((c) => <Row key={c.id} c={c} />)}
        </tbody>
    </table>
    </div>
);
}