import { Platform } from "react-native"

/**
 * Semantic design tokens for Recipe Explorer.
 * NativeWind/Tailwind mirrors these values in `tailwind.config.js`.
 */

export const colors = {
  light: {
    background: "#FFFFFF",
    surface: "#F8FAFC",
    surfaceElevated: "#FFFFFF",
    foreground: "#0F172A",
    foregroundMuted: "#64748B",
    primary: "#0F766E",
    primaryForeground: "#FFFFFF",
    border: "#E2E8F0",
    success: "#15803D",
    warning: "#CA8A04",
    error: "#DC2626",
  },
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    surfaceElevated: "#334155",
    foreground: "#F8FAFC",
    foregroundMuted: "#94A3B8",
    primary: "#2DD4BF",
    primaryForeground: "#042F2E",
    border: "#334155",
    success: "#4ADE80",
    warning: "#FACC15",
    error: "#F87171",
  },
} as const

export type ColorSchemeName = keyof typeof colors
export type SemanticColor = keyof typeof colors.light

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
} as const

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const

export const shadows = {
  sm: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },
} as const

export const animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
} as const

/**
 * Compatibility palette for existing Expo template components.
 * Prefer `colors` semantic tokens for new UI.
 */
export const Colors = {
  light: {
    text: colors.light.foreground,
    background: colors.light.background,
    tint: colors.light.primary,
    icon: colors.light.foregroundMuted,
    tabIconDefault: colors.light.foregroundMuted,
    tabIconSelected: colors.light.primary,
  },
  dark: {
    text: colors.dark.foreground,
    background: colors.dark.background,
    tint: colors.dark.primary,
    icon: colors.dark.foregroundMuted,
    tabIconDefault: colors.dark.foregroundMuted,
    tabIconSelected: colors.dark.primary,
  },
}

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})
