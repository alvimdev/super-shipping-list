"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/src/components/inputs/PasswordInput";
import ErrorModal from "@/src/components/modals/ErrorModal";
import Link from "next/link";
import { fetchWrapper } from "@/src/helpers/FetchHelper";

export default function Cadastro() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await fetchWrapper("/api/user", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      // Redireciona após sucesso
      router.replace("/listas");
    } catch (e: any) {
      setError(e.message || "Erro desconhecido");
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
      <form onSubmit={handleRegister}>
        <div className="py-8">
          <center>
            <span className="text-2xl font-semibold">Cadastro</span>
          </center>
        </div>

        <div>
          <label
            className="block font-medium text-sm text-gray-700"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nome"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
          />
        </div>

        <div className="mt-4">
          <label
            className="block font-medium text-sm text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
          />
        </div>

        <div className="mt-4">
          <PasswordInput
            id="password"
            variant="light"
            name="password"
            placeholder="Senha"
          />
        </div>

        <div className="block mt-4">
          <span className="text-sm text-gray-800">Já tem uma conta? </span>
          <Link href="/login" className="text-sm text-gray-600 hover:underline">
            Faça login!
          </Link>
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            className="ms-4 inline-flex items-center px-4 py-2 bg-[var(--primary)] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[var(--primary-hover)] focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}
