import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/server/auth";
import SignInDiscordButton from "./SignInClient";

async function SignInContent() {
 const session = await auth();
 return (
  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
   <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
    <div className="flex flex-col items-center gap-4">
     <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
      Brasil em <span className="text-[hsl(280,100%,70%)]">Contos</span>
     </h1>
     <p className="text-lg text-white/80">
      Entre para descobrir as melhores histórias brasileiras
     </p>
    </div>

    <div className="w-full max-w-md space-y-6">
     <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
      <h2 className="mb-6 text-center text-2xl font-bold">Entrar</h2>

      <div className="space-y-4">
       <SignInDiscordButton className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#5865F2] px-4 py-3 font-semibold text-white transition hover:bg-[#4752C4]">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
         <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
        Entrar com Discord
       </SignInDiscordButton>

       <div className="relative">
        <div className="absolute inset-0 flex items-center">
         <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
         <span className="bg-gradient-to-b from-[#2e026d] to-[#15162c] px-2 text-white/60">
          ou
         </span>
        </div>
       </div>

       <Link
        href="/api/auth/signin/email"
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
       >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Entrar com Email
       </Link>
      </div>
     </div>

     <div className="text-center">
      <p className="text-sm text-white/60">
       {session && <span>Logado como {session.user?.name ?? session.user?.email}</span>}
      </p>
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

export default function SignIn() {
 return (
  <Suspense fallback={
   <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
   </main>
  }>
   <SignInContent />
  </Suspense>
 );
}