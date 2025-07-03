import {
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  toggleItemComplete,
  getItemsByListId,
} from "@/src/models/item";
import { createItemSchema, updateItemSchema } from "@/src/schemas/item";
import { zodErrorFormatter, getOrFail } from "@/src/utils/validations";
import { getListById } from "@/src/models/list";

async function verifyItemOwnership(itemId: string, userId: string) {
  const item = await getOrFail(() => getItemById(itemId), "Item não encontrado");
  await getOrFail(() => getListById(item.listId, userId), "Lista não encontrada");

  return item;
}

export async function createNewItem(
  listId: string,
  userId: string,
  data: { name: string; quantity: number }
) {
  const parsedData = createItemSchema.safeParse(data);
  zodErrorFormatter(parsedData);

  // Verifica se lista pertence ao usuário (evita criar item em lista que não é dele)
  await getOrFail(() => getListById(listId, userId), "Lista não encontrada");

  return createItem(listId, data);
}

export async function modifyItem(
  itemId: string,
  userId: string,
  data: { name?: string; quantity?: number }
) {
  await verifyItemOwnership(itemId, userId);

  const parsedData = updateItemSchema.partial().safeParse(data);
  zodErrorFormatter(parsedData);

  return updateItem(itemId, data);
}

export async function removeItem(itemId: string, userId: string) {
  await verifyItemOwnership(itemId, userId);

  return deleteItem(itemId);
}

export async function toggleItemCompleteByID(itemId: string, userId: string) {
  await verifyItemOwnership(itemId, userId);

  return toggleItemComplete(itemId);
}

export async function getItemsFromList(listId: string, userId: string) {
  // Garante que o usuário tenha permissão para essa lista
  await getOrFail(() => getListById(listId, userId), "Lista não encontrada");

  return getItemsByListId(listId);
}