import { prisma } from "@/src/lib/prisma";

export async function createList(data: {
  name: string;
  userId: string;
}) {
  return prisma.list.create({
    data,
  });
}

export async function getListById(id: string) {
  return prisma.list.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });
}

export async function getListsByUserId(userId: string) {
  return prisma.list.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });
}

export async function updateList(id: string, data: {
  name?: string;
}) {
  return prisma.list.update({
    where: { id },
    data,
  });
}

export async function deleteList(id: string) {
  return prisma.list.delete({
    where: { id },
  });
}
