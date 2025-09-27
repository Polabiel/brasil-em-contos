export const colorTokens = {
  // UI accents
  primaryMain: "#111827", // dark gray accent
  secondaryMain: "#374151",
  successMain: "#10b981",
  warningMain: "#f59e0b",
  errorMain: "#ef4444",
  // Backgrounds (default to white)
  backgroundDefault: "#ffffff",
  backgroundPaper: "#ffffff",
  gradientStart: "#f8fafc",
  // Text (default to black)
  textPrimary: "#000000",
  textMuted90: "rgba(0,0,0,0.9)",
  textMuted80: "rgba(0,0,0,0.8)",
  textMuted70: "rgba(0,0,0,0.7)",
  textMuted60: "rgba(0,0,0,0.6)",
  // neutrals
  neutral50: "#f3f4f6",
  neutral500: "#6b7280",
  // accent (HSL) fallback
  accentHsl: "hsl(0 0% 0%)",
  // text color to use on top of primary backgrounds
  textOnPrimary: "#ffffff",
} as const;

export type ColorTokens = typeof colorTokens;

export function tokensToCssVars(tokens: ColorTokens) {
  return Object.entries(tokens)
    .map(([k, v]) => `--cv-${k}: ${v};`)
    .join("\n");
}

export default colorTokens;
