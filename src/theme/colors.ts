export const colorTokens = {
  // UI accents - Brazilian inspired colors
  primaryMain: "#1e6b2e", // Brazilian green
  secondaryMain: "#ffd500", // Brazilian yellow
  successMain: "#16a34a", // Enhanced green
  warningMain: "#f59e0b",
  errorMain: "#dc2626",
  // Backgrounds with warmth
  backgroundDefault: "#fefefe",
  backgroundPaper: "#ffffff",
  gradientStart: "#f0f9ff", // Light blue tint
  gradientMid: "#fefce8", // Light yellow tint
  gradientEnd: "#f0fdf4", // Light green tint
  // Text with better contrast
  textPrimary: "#1a202c",
  textSecondary: "#2d3748",
  textMuted90: "rgba(26,32,44,0.9)",
  textMuted80: "rgba(26,32,44,0.8)",
  textMuted70: "rgba(26,32,44,0.7)",
  textMuted60: "rgba(26,32,44,0.6)",
  // Brazilian color palette
  brazilGreen: "#228b22",
  brazilYellow: "#ffd700",
  brazilBlue: "#0039a6",
  // Neutrals with warmth
  neutral50: "#f7fafc",
  neutral100: "#edf2f7",
  neutral200: "#e2e8f0",
  neutral300: "#cbd5e0",
  neutral500: "#718096",
  neutral700: "#4a5568",
  // Accent colors
  accentHsl: "hsl(147 75% 34%)", // Brazilian green in HSL
  accentWarm: "#ff6b35", // Warm coral accent
  accentCool: "#4f46e5", // Cool indigo accent
  // Text color to use on top of primary backgrounds
  textOnPrimary: "#ffffff",
} as const;

export type ColorTokens = typeof colorTokens;

export function tokensToCssVars(tokens: ColorTokens) {
  return Object.entries(tokens)
    .map(([k, v]) => `--cv-${k}: ${v};`)
    .join("\n");
}

export default colorTokens;
