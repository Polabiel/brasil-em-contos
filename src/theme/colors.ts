export const colorTokens = {
  // Primary Colors - Brazilian inspired, refined palette
  primaryMain: "#0d6b2f", // Deep Brazilian green
  primaryLight: "#16a34a", // Vibrant green
  primaryLighter: "#86efac", // Light green for hover states
  
  // Secondary Colors - Golden Brazilian yellow
  secondaryMain: "#f59e0b", // Warm amber (more sophisticated than bright yellow)
  secondaryLight: "#fbbf24", // Light amber
  
  // Semantic colors
  successMain: "#10b981", // Emerald green
  warningMain: "#f59e0b", // Amber
  errorMain: "#ef4444", // Red
  dangerMain: "#dc2626", // Dark red
  
  // Backgrounds - Warm, inviting neutrals
  backgroundDefault: "#fafaf8", // Off-white with warm tint
  backgroundPaper: "#ffffff", // Pure white for cards
  backgroundAlt: "#f7f5f3", // Warm beige
  
  // Gradients - Sophisticated Brazilian theme
  gradientStart: "#f0fdf4", // Light green tint
  gradientMid: "#fffbeb", // Light amber tint
  gradientEnd: "#f0f9ff", // Subtle blue tint
  
  // Text colors - Professional hierarchy
  textPrimary: "#1f2937", // Dark charcoal
  textSecondary: "#4b5563", // Medium gray
  textMuted: "#9ca3af", // Light gray
  textOnPrimary: "#ffffff", // White on dark backgrounds
  textOnSecondary: "#ffffff", // White on secondary
  
  // Legacy mappings for compatibility
  textMuted90: "rgba(31,41,55,0.9)",
  textMuted80: "rgba(31,41,55,0.8)",
  textMuted70: "rgba(31,41,55,0.7)",
  textMuted60: "rgba(31,41,55,0.6)",
  
  // Brazilian color palette - Extended
  brazilGreen: "#0d6b2f",
  brazilYellow: "#f59e0b",
  brazilBlue: "#1e40af",
  brazilOrange: "#ea580c",
  
  // Neutrals - Warm grays
  neutral50: "#fafaf8",
  neutral100: "#f5f3f0",
  neutral200: "#e8e3de",
  neutral300: "#d9cec5",
  neutral400: "#c4b5a0",
  neutral500: "#a89a87",
  neutral600: "#847966",
  neutral700: "#5f574b",
  neutral800: "#3f3a36",
  neutral900: "#1f2937",
  
  // Accent colors for special elements
  accentWarm: "#ea580c", // Warm orange
  accentCool: "#3b82f6", // Modern blue
  accentViolet: "#a855f7", // Purple accent
  
  // Semantic shades
  successLight: "#d1fae5",
  warningLight: "#fef3c7",
  errorLight: "#fee2e2",
  
  // Borders and dividers
  borderLight: "#e5e7eb", // Light border
  borderMedium: "#d1d5db", // Medium border
  borderDark: "#9ca3af", // Dark border
} as const;

export type ColorTokens = typeof colorTokens;

export function tokensToCssVars(tokens: ColorTokens) {
  return Object.entries(tokens)
    .map(([k, v]) => `--cv-${k}: ${v};`)
    .join("\n");
}

export default colorTokens;
