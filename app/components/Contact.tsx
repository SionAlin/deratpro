"use client"

import { useState } from "react";
import { useLang } from "../lib/i18n";

type Errors = { name?: string; phone?: string; message?: string };

const phoneRe = /^(\+40|0)[237]\d{8}$/;

export default function Contact(){
    const { t } = useLang();
    const [values, setValues] = useState({ name: "", phone: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [sent, setSent] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const validate = (): Errors => {
        const e: Errors = {};
        if(values.name.trim().length < 2) e.name = t.contact.errors.name;
        if(!phoneRe.test(values.phone.replace(/[\s.-]/g, ""))) e.phone = t.contact.errors.phone;
        if(values.message.trim().length < 10) e.message = t.contact.errors.message;
        return e;
    };

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if(Object.keys(e).length > 0) return;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if(!res.ok) throw new Error();
            setSubmitError(false);
            setSent(true);
            setValues({ name: "", phone: "", message: "" });
        } catch {
            setSubmitError(true);
        }
    };

    const field = "mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 outline-none focus:border-primary";
    const set = (k: keyof typeof values) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSent(false);
        setValues({...values, [k]: ev.target.value });
    };

    return (
        <section id="contact" className="border-t border-line bg-surface/40">
            <div className="mx-auto max-w-xl px-5 py-24">
                <h2 className="text-3xl font-bold sm:text-4xl">{t.contact.title}</h2>
                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
                    <label className="block text-sm">{t.contact.name}
                        <input className={field} value={values.name} onChange={set("name")} aria-invalid={! !errors.name} />
                        {errors.name && <span className="text-sm text-red-400">{errors.name}</span>}
                    </label>
                    <label className="block text-sm">{t.contact.phone}
                        <input className={field} value={values.phone} onChange={set("phone")} aria-invalid={! !errors.phone} />
                        {errors.phone && <span className="text-sm text-red-400">{errors.phone}</span>}
                    </label>
                    <label className="block text-sm">{t.contact.message}
                        <textarea className={field} rows={4} value={values.message} onChange={set("message")} aria-invalid={! !errors.message} />
                        {errors.message && <span className="text-sm text-red-400">{errors.message}</span>}
                    </label>
                    <button className="rounded-md bg-primary px-6 py-3 font-semibold text-black hover:brightness-110">{t.contact.submit}</button>
                    {sent && <p role="status" className="text-accent">{t.contact.success}</p>}
                    {submitError && <p role="alert" className="text-red-500">{t.contact.submitError}</p>}
                </form>
            </div>
        </section>
    );
}