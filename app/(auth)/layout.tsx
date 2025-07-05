// app/(auth)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticação | SUPER SL",
  description: "Autenticação de usuários",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div>
          <h2 className="font-bold text-3xl">
            SUPER{" "}
            <span className="bg-[var(--primary)] text-white px-2 rounded-md">SL</span>
          </h2>
        </div>
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          {children}
        </div>
      </div>
    </main>
  );
}
