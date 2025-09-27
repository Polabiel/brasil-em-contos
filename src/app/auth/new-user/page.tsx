import Link from "next/link";
import { auth } from "@/server/auth";

export default async function NewUser() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            Brasil em <span className="text-[hsl(280,100%,70%)]">Contos</span>
          </h1>
          <p className="text-xl text-white/80 text-center max-w-2xl">
            Descubra as mais belas histórias do nosso país
          </p>
        </div>

        <div className="w-full max-w-2xl space-y-8">
          <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm text-center">
            <div className="mb-6">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-green-400">Bem-vindo ao Brasil em Contos!</h2>
              {session?.user && (
                <p className="text-lg text-white/90 mb-4">
                  Olá, <span className="font-semibold text-[hsl(280,100%,70%)]">{session.user.name ?? session.user.email}</span>!
                </p>
              )}
              <p className="text-white/70 leading-relaxed">
                Sua conta foi criada com sucesso. Agora você pode explorar nossa coleção de contos brasileiros, 
                desde clássicos da literatura até histórias contemporâneas que capturam a essência da nossa cultura.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold text-white mb-2">📚 Explore Contos</h3>
                <p className="text-sm text-white/60">
                  Navegue por nossa biblioteca de histórias organizadas por região, época e tema.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold text-white mb-2">⭐ Favoritos</h3>
                <p className="text-sm text-white/60">
                  Salve suas histórias preferidas para ler novamente quando quiser.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold text-white mb-2">💬 Comunidade</h3>
                <p className="text-sm text-white/60">
                  Participe de discussões sobre os contos e compartilhe suas impressões.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold text-white mb-2">📖 Leitura</h3>
                <p className="text-sm text-white/60">
                  Interface otimizada para uma experiência de leitura confortável.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full rounded-lg bg-[hsl(280,100%,70%)] px-6 py-4 font-semibold text-white transition hover:bg-[hsl(280,100%,60%)] text-lg"
              >
                Começar a Explorar Contos
              </Link>
              
              <Link
                href="/perfil"
                className="block w-full rounded-lg bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Personalizar Perfil
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-white/50">
              Dicas: Use o menu de navegação para descobrir contos por região ou época histórica.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
