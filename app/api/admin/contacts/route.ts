import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const phoneRe = /^(\+40|0)[237]\d{8}$/;

export async function POST(req: Request){
    const body = await req.json().catch(() => null);

    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").replace(/[\s.-]/g, "");
    const message = String(body?.message ?? "").trim();

    if(name.length < 2 || !phoneRe.test(phone) || message.length < 10)
        return NextResponse.json({ ok: false }, { status: 400 });

    await sql`
        INSERT INTO contacts(name, phone, message)
        VALUES (${name}, ${phone}, ${message})
    `;
    return NextResponse.json({ ok: true });
}