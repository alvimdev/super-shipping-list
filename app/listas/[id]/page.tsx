import { cookies, headers } from "next/headers";
import Itens from "@/src/views/Itens";
import { Metadata } from "next";
import { fetchWrapper } from "@/src/helpers/FetchHelper";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await fetchWrapper(`/api/lists/${id}`, {
      headers: await headers(),
      cache: "no-store",
    });
    if (data.error) {
      return { title: "Lista não encintrada | SUPER SL" };
    }
    return {
      title: `${data.name} | SUPER SL`,
      description: `Visualize os itens de "${data.name}"`,
    };
  } catch {
    return { title: "Erro ao buscar lista | SUPER SL" };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let listName;
  try {
    const data = await fetchWrapper(`/api/lists/${id}`, {
      headers: await headers(),
      cache: "no-store",
    });
    listName = data.name || "Lista não encontrada";
  } catch (error) {
    console.error("Erro ao buscar lista:", error);
    listName = "Lista não encontrada";
  }

  return <Itens listId={id} listName={listName} />;
}
