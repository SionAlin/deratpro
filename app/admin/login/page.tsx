import type { Metadata } from "next";
import LoginForm from "../../components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin — DeratPro",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-8">
        <h1 className="text-2xl font-bold">Autentificare</h1>
        <p className="mt-1 text-sm text-muted">Acces doar pentru administrator.</p>
        <LoginForm />
      </div>
    </main>
  );
}