"use client";

import { Item } from "@/src/types/item";
import { createPortal } from "react-dom";
import { useState } from "react";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import ErrorModal from "./ErrorModal";

type UpdateItemModalProps = {
  item: Item;
  onClose: () => void;
  onUpdate: (updatedItem: Item) => void;
};

export default function UpdateItemModal({
  item,
  onClose,
  onUpdate,
}: UpdateItemModalProps) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updated = await fetchWrapper(
        `/api/lists/${item.listId}/items/${item.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, quantity }),
        }
      );

      onUpdate(updated); // atualiza o componente pai
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao atualizar item.");
      }
    }
  };

  return createPortal(
    <>
      <article className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Editar Item</h2>
          <form onSubmit={handleUpdate}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block font-medium text-sm text-gray-700"
                  htmlFor="name"
                >
                  Item
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
                />
              </div>
              <div className="w-24">
                <label
                  className="block font-medium text-sm text-gray-700"
                  htmlFor="quantity"
                >
                  Quantidade
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="1"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded-md py-2.5 px-3 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
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
