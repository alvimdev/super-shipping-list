"use client";

import Link from "next/link";
import { useState } from "react";
import UserModal from "@/src/components/modals/UserModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <>
      {showModal && (
        <UserModal
          onClose={toggleModal}
        />
      )}
      <header className="mx-10 mt-5 bg-[var(--primary)] shadow rounded-2xl">
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
              <button className="cursor-pointer" onClick={toggleModal} title="Perfil">
                <i className="bi bi-person-square"></i>
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
