"use client";

import { List } from "@/src/types/list";
import { useState } from "react";
import UpdateListModal from "@/src/components/modals/UpdateListModal";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import ErrorModal from "../modals/ErrorModal";
import { useRouter } from "next/navigation";

type ListaCardProps = {
  list: List;
  onDelete?: (id: string) => void;
  onCopy?: (newList: List) => void;
};

export default function ListaCard({ list, onDelete, onCopy }: ListaCardProps) {
  const [showUpdateListModal, setShowUpdateListModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<{
    message: string;
    action: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [listData, setListData] = useState(list);
  const router = useRouter();

  const handleUpdate = (updatedList: List) => {
    setListData(updatedList);
    setShowUpdateListModal(false);
  };

  const handleDelete = () => {
    fetchWrapper(`/api/lists/${listData.id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDelete?.(listData.id);
        setShowConfirmModal(null);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao excluir lista.");
        }
      });
  };

  const handleCopy = () => {
    fetchWrapper(`/api/lists/copy/${listData.id}`, {
      method: "POST",
    })
      .then((newList: List) => {
        onCopy?.(newList);
        setShowConfirmModal(null);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao copiar lista.");
        }
      });
  };

  return (
    <>
      <article className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-gray-800">{listData.name}</h2>
        <p className="text-sm text-gray-900">
          <i className="bi bi-calendar-plus mr-2" />
          <span className="text-gray-600">
            {listData.createdAt instanceof Date
              ? listData.createdAt.toLocaleDateString()
              : String(listData.createdAt)}
          </span>
        </p>
        <p className="text-sm text-gray-900">
          <i className="bi bi-arrow-repeat mr-2" />
          <span className="text-gray-600">
            {listData.updatedAt instanceof Date
              ? listData.updatedAt.toLocaleDateString()
              : String(listData.updatedAt)}
          </span>
        </p>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2 *:hover:scale-115 *:duration-300 *:transition-transform *:cursor-pointer *:text-xl">
            <button
              onClick={() =>
                setShowConfirmModal({
                  message:
                    'Tem certeza de que deseja excluir "' +
                    listData.name +
                    '"?',
                  action: "delete",
                })
              }
              title="Excluir"
            >
              <i className="bi bi-trash3-fill text-red-500"></i>
            </button>
            <button onClick={() => setShowUpdateListModal(true)} title="Editar">
              <i className="bi bi-pencil-square text-amber-300"></i>
            </button>
            <button
              onClick={() =>
                setShowConfirmModal({
                  message: 'Copiar "' + listData.name + '"?',
                  action: "copy",
                })
              }
              title="Copiar"
            >
              <i className="bi bi-copy text-gray-800"></i>
            </button>
          </div>
          <button
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl cursor-pointer hover:bg-[var(--primary-hover)] hover:scale-105 transition-transform duration-200"
            onClick={() => {
              router.push(`/listas/${listData.id}`);
            }}
          >
            Ver Detalhes
          </button>
        </div>
      </article>
      {showUpdateListModal && (
        <UpdateListModal
          list={listData}
          onClose={() => setShowUpdateListModal(false)}
          onUpdate={handleUpdate}
        />
      )}
      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(null)}
          onConfirm={
            showConfirmModal.action === "delete" ? handleDelete : handleCopy
          }
          message={showConfirmModal.message}
        />
      )}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
}
