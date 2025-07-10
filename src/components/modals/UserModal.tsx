"use client";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import PasswordInput from "@/src/components/inputs/PasswordInput";
import ConfirmationModal from "./ConfirmationModal";
import ErrorModal from "./ErrorModal";

type UserModalProps = {
  onClose: () => void;
};

export default function UserModal({ onClose }: UserModalProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    "new-password": "",
  });
  const fetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    if (fetched.current) return;
    fetched.current = true;
    fetchWrapper("/api/user").then((data) => {
      setUserData({ ...userData, name: data.name, email: data.email });
    });

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    fetchWrapper("/api/user", {
      method: "DELETE",
    })
      .then(() => {
        setShowConfirmModal(false);
        router.replace("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleEditToggle = () => {
    if (editing) {
      setError(null);
      fetchWrapper("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          oldPassword: userData.password,
          newPassword: userData["new-password"],
        }),
      })
        .then((data) => {
          setEditing(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
    setEditing(!editing);
  };

  return createPortal(
    <>
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      {showConfirmModal && (
        <ConfirmationModal
          message="Deseja realmente deletar sua conta? Essa ação é irreversível."
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
        />
      )}

      <article className="fixed inset-0 z-5 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Fechar</span>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 6l8 8M6 14L14 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Painel de Usuário
            </h2>

            <form
              className="space-y-4 text-left"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditToggle();
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm text-gray-600">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  disabled={!editing}
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] disabled:cursor-not-allowed text-gray-600 border-gray-300 placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] disabled:cursor-not-allowed text-gray-600 border-gray-300 placeholder-gray-400"
                />
              </div>

              <div>
                <PasswordInput
                  id="new-password"
                  name="new-password"
                  placeholder="Nova Senha"
                  disabled={!editing}
                  onChange={handleChange}
                  required={false}
                />
              </div>

              <div>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="Senha Atual"
                  disabled={!editing}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="inline-flex px-4 py-2 rounded-md bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition"
                >
                  Deletar
                </button>
                <button
                  type="submit"
                  className="inline-flex px-4 py-2 rounded-md bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--primary-hover)] transition"
                >
                  {editing ? "Salvar" : "Editar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </article>
    </>,
    document.body
  );
}
