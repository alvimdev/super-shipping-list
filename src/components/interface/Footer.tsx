import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white py-8 px-4">
      <div className="flex gap-4 justify-center text-2xl *:hover:scale-110 *:transition *:duration-300">
        <Link
          href="https://github.com/alvimdev"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="hover:text-gray-200 transition"
        >
          <i className="bi bi-github" />
        </Link>
        <Link
          href="https://linkedin.com/in/bernardo-alvim"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="hover:text-gray-200 transition"
        >
          <i className="bi bi-linkedin" />
        </Link>
        <Link
          href="https://alvim.dev"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfólio"
          className="hover:text-gray-200 transition"
        >
          <i className="bi bi-globe" />
        </Link>
      </div>

      <hr className="my-4 w-50 mx-auto" />

      <div className="mx-auto sm:text-left max-w-lg">
        <p className="text-sm leading-relaxed text-center">
          Criado por um desenvolvedor apaixonado por resolver problemas reais
          com soluções simples e funcionais. O <strong>SUPER SL</strong> nasceu
          da ideia de transformar a tarefa de fazer compras em algo prático,
          rápido e acessível, seja no celular ou no desktop.
        </p>
      </div>

      <div className="text-center mt-6 text-sm text-white/70">
        &copy; {new Date().getFullYear()} Bernardo Alvim • Todos os direitos
        reservados
      </div>
    </footer>
  );
}
