import { Metadata } from "next";
import Login from "@/src/views/Login";

export const metadata: Metadata = {
  title: "Login | SUPER SL",
  description: "Faça login na sua conta SUPER Shopping List",
};

export default function Page() {
  return <Login />;
}