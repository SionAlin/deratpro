import { neon } from "@neondatabase/serverless";

function createClient() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL lipsește");
    return neon(url);
}

let client: ReturnType<typeof createClient> | undefined;

export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
    client ??= createClient();
    return client(strings, ...values);
}