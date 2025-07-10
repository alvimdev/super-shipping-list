"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UserModal from "@/src/components/modals/UserModal";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import ConfirmationModal from "../modals/ConfirmationModal";
import ErrorModal from "../modals/ErrorModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_active="));
    setIsAuthenticated(authCookie?.split("=")[1] === "true");
  }, []);

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleLogout = () => {
    fetchWrapper("/api/logout", {
      method: "POST",
    })
      .then(() => {
        setIsAuthenticated(false);
        setShowModal(false);
        router.replace("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      {showModal && isAuthenticated && <UserModal onClose={toggleModal} />}
      <header className="bg-[var(--primary)] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-col justify-center gap-3 sm:justify-between sm:flex-row py-5 h-fit text-white">
            <div>
              <h2 className="text-white font-bold text-2xl">
                SUPER{" "}
                <span className="text-[var(--primary)] bg-white px-2 rounded-md">
                  SL
                </span>
              </h2>
            </div>
            <nav className="md:flex space-x-6 *:text-2xl *:hover:scale-110 *:transition *:duration-300">
              <Link href="/" title="Início">
                <i className="bi bi-house-fill"></i>
              </Link>
              <Link href="/listas" title="Listas de Compras">
                <i className="bi bi-list-nested"></i>
              </Link>

              {isAuthenticated ? (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setShowConfirmModal("Tem certeza que deseja sair?")
                    }
                    title="Sair"
                  >
                    <i className="bi bi-box-arrow-left"></i>
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={toggleModal}
                    title="Perfil"
                  >
                    <i className="bi bi-person-square"></i>
                  </button>
                </>
              ) : (
                <Link href="/login" title="Entrar">
                  <i className="bi bi-box-arrow-in-right"></i>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      {showConfirmModal && isAuthenticated && (
        <ConfirmationModal
          message={showConfirmModal}
          onClose={() => setShowConfirmModal(null)}
          onConfirm={handleLogout}
        />
      )}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
}
