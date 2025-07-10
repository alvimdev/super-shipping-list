import { Item } from "@/src/types/item";
import { useState } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";
import ErrorModal from "../modals/ErrorModal";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import UpdateItemModal from "../modals/UpdateItemModal";

type ItemCardProps = {
  item: Item;
  onDelete?: (id: string) => void;
};

export default function ItemCard({ item, onDelete }: ItemCardProps) {
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const [itemData, setItemData] = useState(item);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".relative")) {
          setMenuOpen(false);
        }
      });
    } else {
      document.removeEventListener("click", () => {});
    }
  };

  const handleDelete = () => {
    fetchWrapper(`/api/lists/${itemData.listId}/items/${itemData.id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDelete?.(itemData.id);
        setShowConfirmModal(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleUpdate = (updatedItem: Item) => {
    setItemData(updatedItem);
    setShowUpdateItemModal(false);
  };

  const handleCheckboxChange = () =>
    fetchWrapper(`/api/lists/${itemData.listId}/items/toggle/${itemData.id}`, {
      method: "POST",
    })
      .then((data) => {
        setIsCompleted(data.completed);
      })
      .catch((err) => {
        setError(err.message);
      });

  return (
    <>
      <div className="relative flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="w-5 h-5 accent-[var(--primary)]"
          />
          <div className={isCompleted ? "line-through text-gray-400" : ""}>
            <h3 className="text-lg font-semibold">{itemData.name}</h3>
            <p className="text-gray-600 text-sm">
              Quantidade: {itemData.quantity}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <i className="bi bi-x-lg"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-md z-2 text-sm">
              <button
                onClick={() => setShowUpdateItemModal(true)}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left"
              >
                <i className="bi bi-pencil-fill"></i> Editar
              </button>
              <button
                onClick={() =>
                  setShowConfirmModal(
                    "Tem certeza que deseja apagar este item?"
                  )
                }
                className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
              >
                <i className="bi bi-trash-fill"></i> Apagar
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmationModal
          message={showConfirmModal}
          onClose={() => setShowConfirmModal(null)}
          onConfirm={handleDelete}
        />
      )}
      {showUpdateItemModal && (
        <UpdateItemModal
          item={itemData}
          onClose={() => setShowUpdateItemModal(false)}
          onUpdate={handleUpdate}
        />
      )}
      {error && <ErrorModal onClose={() => setError(null)} message={error} />}
    </>
  );
}
