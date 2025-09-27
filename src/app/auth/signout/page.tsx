import Link from "next/link";
import { Suspense } from "react";
import SignOutButton from "./SignOutClient";

function SignOutContent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
            Brasil em <span className="text-[hsl(280,100%,70%)]">Contos</span>
          </h1>
          <p className="text-lg text-white/80">
            Desconectar da sua conta
          </p>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm text-center">
            <div className="mb-6">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Confirmar Saída</h2>
              <p className="text-white/70">
                Tem certeza que deseja sair da sua conta?
              </p>
            </div>
            
            <div className="space-y-3">
              <SignOutButton className="block w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700" />
              
              <Link
                href="/"
                className="block w-full rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Cancelar
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white/80 transition"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SignOut() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </main>
    }>
      <SignOutContent />
    </Suspense>
  );
}