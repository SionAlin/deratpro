import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8;

function secret(): string {
    const s = process.env.ADMIN_SESSION_SECRET;
    if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET lipsește sau e prea scurt");
    return s;
}

function sign(value: string): string {
    return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
    const ha = createHash("sha256").update(a).digest();
    const hb = createHash("sha256").update(b).digest();
    return timingSafeEqual(ha, hb);
}

export function checkPassword(input: string): boolean {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return false;
    return safeEqual(input, expected);
}

function createToken(): string {
    const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
    return `${exp}.${sign(exp)}`;
}

function verifyToken(token: string | undefined): boolean {
    if (!token) return false;
    const [exp, sig] = token.split(".");
    if (!exp || !sig) return false;
    if (!safeEqual(sig, sign(exp))) return false;
    return Number(exp) > Date.now() / 1000;
}

export async function startSession() {
    (await cookies()).set(SESSION_COOKIE, createToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
    });
}

export async function endSession() {
    (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
    return verifyToken((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
    if (!(await isAdmin())) redirect("/admin/login");
}