import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative h-screen w-full bg-white text-center flex items-center justify-center px-4">
      <div className="max-w-[520px] w-full">
        <div className="h-[190px] md:h-[115px]">
          <h1 className="text-[146px] md:text-[86px] font-bold text-[#232323] m-0 leading-none flex justify-center items-center ">
            <em className="z-[2]">4</em>
            <span
              className="inline-block w-[120px] h-[120px] md:w-[86px] md:h-[86px] bg-center bg-cover scale-[1.4] z-[1]"
              style={{
                backgroundImage: "url('/emoji.png')",
              }}
            ></span>
            <em>4</em>
          </h1>
        </div>

        <h2 className="text-[22px] font-bold uppercase text-[#232323] my-4">
          Opa! Página não encontrada
        </h2>
        <p className="text-[#787878] font-light mb-6">
          Pedimos desculpas, mas a página que você está procurando não existe ou foi movida.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 font-bold text-white bg-[var(--primary)] rounded-full hover:opacity-80 transition"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
}
