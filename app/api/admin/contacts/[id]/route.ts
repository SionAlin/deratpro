import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/auth";
import { sql } from "../../../../lib/database";
import { STATUS_KEYS, NOTES_MAX } from "../../../../lib/statuses";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAdmin())) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    const id = Number((await params).id);
    if (!Number.isInteger(id) || id < 1) {
        return NextResponse.json({ ok: false }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    const status = String(body?.status ?? "");
    const notes = String(body?.notes ?? "").trim();

    if (!(STATUS_KEYS as string[]).includes(status) || notes.length > NOTES_MAX) {
        return NextResponse.json({ ok: false }, { status: 400 });
    }

    const rows = await sql`
        UPDATE contacts
        SET status = ${status}, notes = ${notes === "" ? null : notes}
        WHERE id = ${id}
        RETURNING id
    `;
    if (rows.length === 0) {
        return NextResponse.json({ ok: false }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
}