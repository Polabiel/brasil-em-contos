import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { tokensToCssVars, colorTokens } from "@/theme/colors";

import { TRPCReactProvider } from "@/trpc/react";
import MuiProvider from "@/app/_components/providers/MuiProvider";
import NavBar from "@/app/_components/layout/NavBar";

export const metadata: Metadata = {
  title: "Brasil em Contos",
  description: "Descubra as melhores histórias brasileiras",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root{\n${tokensToCssVars(colorTokens)}\n}` }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <MuiProvider>
          <TRPCReactProvider>
            <NavBar />
            {children}
          </TRPCReactProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
