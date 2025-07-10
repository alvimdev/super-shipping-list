"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import PasswordInput from "@/src/components/inputs/PasswordInput";
import ErrorModal from "@/src/components/modals/ErrorModal";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await fetchWrapper("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      // Redireciona após sucesso
      router.replace("/listas");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Erro ao fazer login.");
      }
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <form onSubmit={handleLogin}>
        <div className="py-8">
          <center>
            <span className="text-2xl font-semibold">Log In</span>
          </center>
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
          />
        </div>

        <div className="mt-4">
          <PasswordInput
            id="password"
            variant="light"
            name="password"
            placeholder="Senha"
            required
          />
        </div>

        <div className="block mt-4">
          <span className="text-sm text-gray-800">Ainda sem conta? </span>
          <Link href="/cadastro" className="text-sm text-gray-600 hover:underline">
            Cadastre-se já!
          </Link>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link href="/recuperar" className="text-sm text-gray-600 hover:underline">
            Esqueceu sua senha?
          </Link>

          <button
            type="submit"
            className="ms-4 inline-flex items-center px-4 py-2 bg-[var(--primary)] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[var(--primary-hover)] focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer"
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}
