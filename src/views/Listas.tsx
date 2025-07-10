"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/src/components/interface/Header";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import ErrorModal from "@/src/components/modals/ErrorModal";
import { List } from "@/src/types/list";
import ListaCard from "@/src/components/interface/ListaCard";
import CreateListModal from "@/src/components/modals/CreateListModal";

export default function Listas() {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    fetchWrapper("/api/lists")
      .then((data) => {
        setLists(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center flex-wrap justify-between mb-6">
          <div className="flex-1" />
          <h1 className="text-2xl font-bold text-center flex-1">
            Minhas Listas
          </h1>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setShowCreateListModal(true)}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-hover)] transition-transform duration-200 hover:scale-105"
              aria-label="Adicionar nova lista"
              title="Nova lista"
            >
              <i className="bi bi-bag-plus-fill"></i>
            </button>
          </div>
        </div>

        {lists.length > 0 ? (
          <div className="flex flex-col justify-center gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {lists.map((list) => (
              <ListaCard
                key={list.id}
                list={list}
                onDelete={(id) =>
                  setLists((prev) => prev.filter((l) => l.id !== id))
                }
                onCopy={(newList) => setLists((prev) => [newList, ...prev])}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Nenhuma lista encontrada.</p>
          </div>
        )}
      </div>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      {showCreateListModal && (
        <CreateListModal
          onClose={() => setShowCreateListModal(false)}
          onCreate={(newList) => setLists((prev) => [newList, ...prev])}
        />
      )}
    </main>
  );
}
