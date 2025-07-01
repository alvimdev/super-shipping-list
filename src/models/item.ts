import { prisma } from "@/src/lib/prisma";

export async function createItem(listId: string, data: { name: string; quantity: number }) {
  return prisma.item.create({
    data: {
      ...data,
      completed: false,
      list: {
        connect: { id: listId },
      },
    },
  });
}

export async function getItemById(id: string) {
  return prisma.item.findUnique({
    where: { id },
  });
}

export async function updateItem(id: string, data: { name?: string; quantity?: number }) {
  return prisma.item.update({
    where: { id },
    data,
  });
}

export async function deleteItem(id: string) {
  return prisma.item.delete({
    where: { id },
  });
}