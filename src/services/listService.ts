import {
  createList,
  updateList,
  getListById,
  getListsByUserId,
  deleteList
} from "@/src/models/list";
import { createListSchema, updateListSchema } from "@/src/schemas/list";
import { zodErrorFormatter, getOrFail } from "@/src/utils/validations";
import { getUserById } from "@/src/models/user";
import { createItem } from "@/src/models/item";

export async function createNewList(userId: string, name: string) {
  const parsedData = createListSchema.safeParse({ name });
  zodErrorFormatter(parsedData);

  await getOrFail(() => getUserById(userId), "Usuário não encontrado");

  return createList({ userId, name });
}

export async function copyList(listId: string, userId: string) {
  const list = await getOrFail(
    () => getListById(listId, userId),
    "Lista não encontrada"
  );

  const newList = await createList({
    userId,
    name: `Cópia de ${list.name}`,
  });

  for (const item of list.items) {
    await createItem(newList.id, {
      name: item.name,
      quantity: item.quantity,
    });
  }

  return newList;
}

export async function modifyList(
  listId: string,
  userId: string,
  data: { name?: string }
) {
  const parsedData = updateListSchema.partial().safeParse(data);
  zodErrorFormatter(parsedData);

  // Verifica se lista existe e pertence ao usuário
  await getOrFail(
    () => getListById(listId, userId),
    "Lista não encontrada"
  );

  return updateList(listId, data);
}

export async function getUserLists(userId: string) {
  return getListsByUserId(userId);
}

export async function removeList(listId: string, userId: string) {
  await getOrFail(
    () => getListById(listId, userId),
    "Lista não encontrada"
  );

  return deleteList(listId);
}
