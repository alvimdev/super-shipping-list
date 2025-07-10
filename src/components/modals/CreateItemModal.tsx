import { fetchWrapper } from "@/src/helpers/FetchHelper";
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { Item } from "@/src/types/item";
import { createPortal } from "react-dom";

type CreateListModalProps = {
  onClose: () => void;
  onCreate?: (newList: Item) => void;
  listId: string;
};

export default function CreateItemModal({
  onClose,
  onCreate,
  listId,
}: CreateListModalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const quantity = parseInt(formData.get("quantity")?.toString() || "1", 10);

    if (!name || isNaN(quantity) || quantity < 1) {
      setError("Preencha os campos corretamente.");
      return;
    }

    fetchWrapper(`/api/lists/${listId}/items`, {
      method: "POST",
      body: JSON.stringify({ name, quantity }),
    })
      .then((newItem) => {
        onCreate?.(newItem);
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao criar item:", error);
        setError(error.message || "Erro ao criar item.");
      });
  };

  return createPortal(
    <>
      <article className="fixed inset-0 bg-black/50 z-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Adicionar Item</h2>
          <form onSubmit={handleSubmit}>
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
                  defaultValue="1"
                  required
                  className="w-full rounded-md py-2.5 px-3 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Adicionar
            </button>
          </form>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
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
