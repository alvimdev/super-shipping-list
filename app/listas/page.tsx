import { Metadata } from "next";
import Listas from "@/src/views/Listas";

export const metadata: Metadata = {
  title: "Listas | SUPER SL",
  description: "Gerencie suas listas de compras de forma simples e eficiente com o SUPER SL.",
};

export default function Page() {
  return <Listas />;
}