"use client";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { type ReactNode, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { colorTokens } from "@/theme/colors";

export default function MuiProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    (Object.entries(colorTokens) as [string, string][]).forEach(([key, value]) => {
      root.style.setProperty(`--cv-${key}`, value);
    });
  }, []);

  const joyTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: colorTokens.primaryMain,
            solidBg: colorTokens.primaryMain,
            solidColor: colorTokens.textOnPrimary,
            outlinedBorder: colorTokens.primaryMain,
            plainColor: colorTokens.primaryMain,
          },
          background: {
            body: colorTokens.backgroundDefault,
            surface: colorTokens.backgroundPaper,
          },
          neutral: {
            50: colorTokens.neutral50,
            500: colorTokens.neutral500,
          },
        },
      },
    },
  });

  const muiTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: colorTokens.primaryMain, contrastText: colorTokens.textOnPrimary },
      secondary: { main: colorTokens.secondaryMain },
      success: { main: colorTokens.successMain },
      warning: { main: colorTokens.warningMain },
      error: { main: colorTokens.errorMain },
      background: { default: colorTokens.backgroundDefault, paper: colorTokens.backgroundPaper },
    },
    typography: {
      fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssVarsProvider theme={joyTheme}>
        <CssBaseline />
        <SessionProvider>
          {children}
        </SessionProvider>
      </CssVarsProvider>
    </MuiThemeProvider>
  );
}