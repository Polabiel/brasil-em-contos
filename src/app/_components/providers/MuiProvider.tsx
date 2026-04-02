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
            50: colorTokens.primaryLighter,
            100: colorTokens.primaryLight,
            500: colorTokens.primaryMain,
            600: colorTokens.brazilGreen,
            solidBg: colorTokens.primaryMain,
            solidColor: colorTokens.textOnPrimary,
            outlinedBorder: colorTokens.primaryMain,
            plainColor: colorTokens.primaryMain,
            plainHoverBg: colorTokens.primaryLighter,
          },
          success: {
            500: colorTokens.successMain,
          },
          warning: {
            500: colorTokens.warningMain,
          },
          danger: {
            500: colorTokens.errorMain,
          },
          background: {
            body: colorTokens.backgroundDefault,
            surface: colorTokens.backgroundPaper,
            level1: colorTokens.backgroundAlt,
          },
          neutral: {
            50: colorTokens.neutral50,
            100: colorTokens.neutral100,
            200: colorTokens.neutral200,
            300: colorTokens.neutral300,
            500: colorTokens.neutral500,
            700: colorTokens.neutral700,
            800: colorTokens.neutral800,
          },
          divider: colorTokens.borderLight,
        },
      },
    },
  });

  const muiTheme = createTheme({
    palette: {
      mode: "light",
      primary: { 
        main: colorTokens.primaryMain, 
        light: colorTokens.primaryLight,
        dark: colorTokens.brazilGreen,
        contrastText: colorTokens.textOnPrimary 
      },
      secondary: { 
        main: colorTokens.secondaryMain,
        light: colorTokens.secondaryLight,
        contrastText: colorTokens.textOnSecondary 
      },
      success: { main: colorTokens.successMain },
      warning: { main: colorTokens.warningMain },
      error: { main: colorTokens.errorMain },
      background: { 
        default: colorTokens.backgroundDefault, 
        paper: colorTokens.backgroundPaper 
      },
      text: {
        primary: colorTokens.textPrimary,
        secondary: colorTokens.textSecondary,
      },
      divider: colorTokens.borderLight,
    },
    typography: {
      fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
      h1: {
        fontSize: "2.25rem",
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.75,
      },
    },
    shape: {
      borderRadius: 8,
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