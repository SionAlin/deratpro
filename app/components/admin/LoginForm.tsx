"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!password) {
      setError("Introdu parola.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.status === 429) {
        setError("Prea multe încercări. Încearcă mai târziu.");
        return;
      }
      if (!res.ok) {
        setError("Parolă incorectă.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Eroare de rețea. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
      <label className="block text-sm">
        Parolă
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 outline-none focus:border-primary"
        />
      </label>
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      <button
        disabled={loading}
        className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-black hover:brightness-110 disabled:opacity-60"
      >
        {loading ? "Se verifică..." : "Intră"}
      </button>
    </form>
  );
}