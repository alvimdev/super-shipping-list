"use client";

import { List } from "@/src/types/list";
import { createPortal } from "react-dom";
import { useState } from "react";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import ErrorModal from "./ErrorModal";

type UpdateListModalProps = {
  list: List;
  onClose: () => void;
  onUpdate: (updatedList: List) => void;
};

export default function UpdateListModal({
  list,
  onClose,
  onUpdate,
}: UpdateListModalProps) {
  const [name, setName] = useState(list.name);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updated = await fetchWrapper(`/api/lists/${list.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      onUpdate(updated); // atualiza o componente pai
      onClose();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar lista.");
    }
  };

  return createPortal(
    <>
      <article className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Editar Lista</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome da Lista
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </form>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors mt-4"
          >
            Cancelar
          </button>
        </div>
      </article>
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>,
    document.body
  );
}