import { Metadata } from "next";
import Cadastro from "@/src/views/Cadastro";

export const metadata: Metadata = {
  title: "Cadastro | SUPER SL",
  description: "Registre-se na sua conta SUPER Shopping List",
};

export default function Page() {
  return <Cadastro />;
}
