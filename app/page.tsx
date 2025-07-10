import Header from "@/src/components/interface/Header";
import Footer from "@/src/components/interface/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Organize suas compras com facilidade
        </h1>
        <p className="text-lg mb-6">
          Crie listas, marque itens comprados e nunca mais esqueça o que
          precisa!
        </p>
        <div className="flex justify-center gap-4 *:bg-white *:text-[var(--primary)] *:font-semibold *:px-6 *:py-2 *:rounded-full *:hover:bg-gray-200 *:transition">
          <Link href="/login">Entrar</Link>
          <Link href="/register">Criar Conta</Link>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Por que usar o <span className="bg-[var(--primary)] text-white rounded px-2 py1">SUPER SL</span>{" "}?</h2>
          <div className="grid md:grid-cols-3 gap-8 [&_div]:hover:shadow-lg [&_div]:transition-shadow [&_div]:duration-200">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">
                ✅ Listas personalizadas
              </h3>
              <p>Crie, edite e delete listas com total liberdade.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">🛍️ Itens marcáveis</h3>
              <p>
                Adicione quantidades, marque o que já comprou e mantenha tudo
                organizado.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">
                🔁 Reutilize listas
              </h3>
              <p>
                Duplique listas antigas com um clique e facilite sua rotina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-25 text-center px-4">
        <h2 className="text-2xl font-bold mb-4">
          Comece sua organização agora
        </h2>
        <Link href="/listas">
          <button className="bg-[var(--primary)] text-white px-8 py-3 rounded hover:bg-[var(--primary-hover)] transition">
            Criar Lista Agora
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
