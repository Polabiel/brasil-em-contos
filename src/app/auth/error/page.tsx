import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/server/auth";

type ErrorType = 
  | 'Configuration'
  | 'AccessDenied'
  | 'Verification'
  | 'Default';

interface ErrorInfo {
  title: string;
  description: string;
  action?: string;
}

const errorMessages: Record<ErrorType, ErrorInfo> = {
  Configuration: {
    title: 'Erro de Configuração',
    description: 'Há um problema na configuração do servidor. Tente novamente mais tarde.',
  },
  AccessDenied: {
    title: 'Acesso Negado',
    description: 'Você não tem permissão para acessar este recurso.',
    action: 'Entre com uma conta autorizada',
  },
  Verification: {
    title: 'Falha na Verificação',
    description: 'O link de verificação é inválido ou expirou.',
    action: 'Solicite um novo link de verificação',
  },
  Default: {
    title: 'Erro de Autenticação',
    description: 'Ocorreu um erro durante o processo de autenticação.',
  },
};

async function AuthErrorContent({ searchParams }: { searchParams: { error?: string } }) {
  const session = await auth();
  const errorType = (searchParams.error as ErrorType) || 'Default';
  const error = errorMessages[errorType] || errorMessages.Default;

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
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-red-400">{error.title}</h2>
              <p className="text-white/70 mb-4">
                {error.description}
              </p>
              {error.action && (
                <p className="text-sm text-white/50">
                  {error.action}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Tentar Novamente
              </Link>
              
              <Link
                href="/"
                className="block w-full rounded-lg bg-transparent px-4 py-3 font-semibold text-white/70 transition hover:text-white border border-white/20 hover:border-white/40"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>

          {errorType !== 'Default' && (
            <div className="text-center">
              <p className="text-xs text-white/40">
                Código do erro: {errorType}
              </p>
              {session && (
                <p className="text-xs text-white/40">Usuário: {session.user?.email}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AuthError({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </main>
    }>
      <AuthErrorContent searchParams={searchParams} />
    </Suspense>
  );
}