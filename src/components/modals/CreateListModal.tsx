import { fetchWrapper } from "@/src/helpers/FetchHelper";
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { List } from "@/src/types/list";
import { createPortal } from "react-dom";

type CreateListModalProps = {
  onClose: () => void;
  onCreate?: (newList: List) => void;
};

export default function CreateListModal({
  onClose,
  onCreate,
}: CreateListModalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    fetchWrapper("/api/lists", {
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then((newList) => {
        console.log("Nova lista criada:", newList);
        onCreate?.(newList);
        onClose();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return createPortal(
    <>
      <article className="fixed inset-0 bg-black/50 z-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Criar Nova Lista</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="name"
              >
                Nome da Lista
              </label>
              <input
                type="name"
                name="name"
                placeholder="Nome"
                required
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[var(--primary)] border-gray-300 placeholder-gray-400 text-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Criar Lista
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
