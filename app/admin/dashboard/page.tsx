import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin, endSession } from "../../lib/auth";
import { sql } from "../../lib/database";
import ContactsTable, { type ContactRow } from "../../components/admin/ContactsTable";

export const metadata: Metadata = {
    title: "Dashboard — DeratPro",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function logout() {
    "use server";
    await endSession();
    redirect("/admin/login");
}

export default async function DashboardPage() {
    await requireAdmin();

    const rows = await sql`
        SELECT id, name, phone, message, created_at, status, notes
        FROM contacts
        ORDER BY created_at DESC
    `;

    const contacts: ContactRow[] = rows.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        message: r.message,
        created_at: new Date(r.created_at).toISOString(),
        status: r.status,
        notes: r.notes,
    }));

    return (
        <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold">Cereri de ofertă</h1>
            <p className="text-sm text-muted">{contacts.length} în total</p>
            </div>
            <form action={logout}>
            <button className="rounded-md border border-line px-3 py-2 text-sm hover:border-primary hover:text-primary">
                Deconectare
            </button>
            </form>
        </div>
        <div className="mt-8">
            <ContactsTable contacts={contacts} />
        </div>
        </main>
    );
}