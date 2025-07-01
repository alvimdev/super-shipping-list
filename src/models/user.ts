import { prisma } from "@/src/lib/prisma";

export function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  return prisma.user.create({
    data,
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export function updateUser(id: string, data: {
  password: string;
  name: string;
}) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}