export default function AuthLayout({
  children,
  title
}: {
  children: React.ReactNode,
  title?: string;
}) {
  return (
    <html lang="pt-br">
        <head>
            <title>{title || 'Autenticação'}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Autenticação de usuários" />
            <meta name="theme-color" content="#000000" />
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
            <main className="font-sans text-gray-900 antialiased">
                <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
                    <div>
                        <h2 className="font-bold text-3xl">
                            SUPER <span className="bg-[#f84525] text-white px-2 rounded-md">SL</span>
                        </h2>
                    </div>
                    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </main>
        </body>
    </html>
  );
}