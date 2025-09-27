import Link from "next/link";

export default async function VerifyRequest() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
            Brasil em <span className="text-[hsl(280,100%,70%)]">Contos</span>
          </h1>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm text-center">
            <div className="mb-6">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Verifique seu email</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Enviamos um link de acesso para o seu email.
                </p>
                <p className="text-sm">
                  Clique no link recebido para fazer login na sua conta.
                </p>
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                  <p className="text-sm text-blue-300">
                    <strong>Dica:</strong> Se você não encontrar o email, verifique sua pasta de spam ou lixo eletrônico.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Tentar outro email
              </Link>
              
              <Link
                href="/"
                className="block w-full rounded-lg bg-transparent px-4 py-3 font-semibold text-white/70 transition hover:text-white border border-white/20 hover:border-white/40"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-white/50">
              O link de verificação expira em 24 horas.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}