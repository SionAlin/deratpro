"use client"
import { useState } from "react";

type Errors = { name?: string; phone?: string; message?: string };

const phoneRe = /^(\+40|0)[237]\d{8}$/;

export default function Contact(){
    const [values, setValues] = useState({ name: "", phone: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [sent, setSent] = useState(false);

    const validate = (): Errors => {
        const e: Errors = {};
        if(values.name.trim().length < 2) e.name = "Introdu numele tău.";
        if(!phoneRe.test(values.phone.replace(/[\s.-]/g, ""))) e.phone = "Introdu un număr de telefon valid.";
        if(values.message.trim().length < 10) e.message = "Mesajul trebuie să aibă cel puțin 10 caractere."
        return e;
    };

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if(Object.keys(e).length === 0){
            setSent(true);
            setValues({ name: "", phone: "", message: "" });
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
                <h2 className="text-3xl font-bold sm:text-4xl">Cere o ofertă</h2>
                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
                    <label className="block text-sm">Nume
                        <input className={field} value={values.name} onChange={set("name")} aria-invalid={! !errors.name} />
                        {errors.name && <span className="text-sm text-red-400">{errors.name}</span>}
                    </label>
                    <label className="block text-sm">Telefon
                        <input className={field} value={values.phone} onChange={set("phone")} aria-invalid={! !errors.phone} />
                        {errors.phone && <span className="text-sm text-red-400">{errors.phone}</span>}
                    </label>
                    <label className="block text-sm">Mesaj
                        <textarea className={field} rows={4} value={values.message} onChange={set("message")} aria-invalid={! !errors.message} />
                        {errors.message && <span className="text-sm text-red-400">{errors.message}</span>}
                    </label>
                    <button className="rounded-md bg-primary px-6 py-3 font-semibold text-black hover:brightness-110">Trimite</button>
                    {sent && <p role="status" className="text-accent"> Mulțumim! Te vom contacta în curând.</p>}
                </form>
            </div>
        </section>
    );
}