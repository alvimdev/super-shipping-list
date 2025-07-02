import {
  getItemsByListId,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  toggleItemComplete,
} from "@/src/models/item";
import { createItemSchema, updateItemSchema } from "@/src/schemas/item";
import { zodErrorFormatter, getOrFail } from "@/src/utils/validations";

export async function createNewItem(
  listId: string,
  data: { name: string; quantity: number }
) {
  const parsedData = createItemSchema.safeParse(data);
  zodErrorFormatter(parsedData);

  return createItem(listId, data);
}

export async function modifyItem(
  itemId: string,
  data: { name?: string; quantity?: number }
) {
  await getOrFail(() => getItemById(itemId), "Item não encontrado");

  const parsedData = updateItemSchema.partial().safeParse(data);
  zodErrorFormatter(parsedData);

  return updateItem(itemId, data);
}

export async function removeItem(itemId: string) {
  await getOrFail(() => getItemById(itemId), "Item não encontrado");

  return deleteItem(itemId);
}

export async function toggleItemCompleteByID(itemId: string) {
  await getOrFail(() => getItemById(itemId), "Item não encontrado");

  return toggleItemComplete(itemId);
}

export async function getItemsForList(listId: string) {
  return getItemsByListId(listId);
}