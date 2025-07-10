"use client";

import { useEffect, useState } from "react";
import { Item } from "@/src/types/item";
import { fetchWrapper } from "@/src/helpers/FetchHelper";
import Header from "@/src/components/interface/Header";
import ErrorModal from "@/src/components/modals/ErrorModal";
import CreateItemModal from "@/src/components/modals/CreateItemModal";
import ItemCard from "../components/interface/ItemCard";
import Footer from "../components/interface/Footer";

type ItensProps = {
  listId: string;
  listName?: string;
};

export default function Itens({ listId, listName }: ItensProps) {
  const [itens, setItens] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      fetchWrapper(`/api/lists/${listId}/items`)
        .then((data) => {
          console.log("Itens recebidos:", data);
          setItens(data);
        })
        .catch((err: any) => {
          setError(err.message);
          setItens([]);
        });
    };

    fetchItems();
  }, [listId]);

  return (
    <main>
      <Header/>
      <div>
        <button className="fixed bottom-4 right-4 bg-[var(--primary)] text-white text-2xl px-4 py-2 rounded-full shadow-lg hover:bg-[var(--primary-hover)] transition-transform duration-200 hover:scale-105" title="Adicionar Item" aria-label="Adicionar Item"
          onClick={() => setShowCreateItemModal(true)}
        >
          <i className="bi bi-plus font-extrabold"></i>
        </button>
      </div>
      {itens.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">{listName}</h1>
          <p className="text-gray-600">Lista de compras vazia.</p>
          <p className="text-gray-600">Adicione um item!</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">{listName || "Itens"}</h1>
          <ul className="space-y-2">
            {itens.sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
              <ItemCard 
                key={item.id}
                item={item}
                onDelete={(id) => setItens((prev) => prev.filter((i) => i.id !== id))}
              />
            ))}
          </ul>
        </div>
      )}
      {showCreateItemModal && (
        <CreateItemModal
          listId={listId}
          onClose={() => setShowCreateItemModal(false)}
          onCreate={(newItem) => setItens((prev) => [...prev, newItem])}
        />
      )}
      {error && (
        <ErrorModal message={error} onClose={() => setError(null)} />
      )}
    </main>
  );
}
