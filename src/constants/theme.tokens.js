/**
 * Canonical design tokens for Recipe Explorer.
 * Imported by `theme.ts` (typed exports) and `tailwind.config.js` (NativeWind).
 */

/** @type {const} */
const colors = {
  light: {
    background: "#F8F8F3",
    surface: "#E6EEDC",
    surfaceElevated: "#FFFFFF",
    surfaceFloating: "rgba(255, 255, 255, 0.94)",
    foreground: "#20251D",
    foregroundMuted: "#6F756B",
    primary: "#304C24",
    primarySoft: "#E6EEDC",
    primaryForeground: "#FFFFFF",
    border: "#E4E8DF",
    overlay: "rgba(32, 37, 29, 0.48)",
    success: "#304C24",
    warning: "#B45309",
    error: "#B42318",
    favorite: "#C7344A",
  },
  dark: {
    background: "#121410",
    surface: "#1E2219",
    surfaceElevated: "#282C24",
    surfaceFloating: "rgba(30, 34, 25, 0.94)",
    foreground: "#F0F2ED",
    foregroundMuted: "#9AA194",
    primary: "#8FB07A",
    primarySoft: "#2A3524",
    primaryForeground: "#121410",
    border: "#3A4034",
    overlay: "rgba(0, 0, 0, 0.52)",
    success: "#8FB07A",
    warning: "#F0B429",
    error: "#F97066",
    favorite: "#FB7185",
  },
}

/** 4px-based spacing scale */
/** @type {const} */
const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  section: 20,
  "2xl": 32,
  "3xl": 48,
}

/** @type {const} */
const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  card: 24,
  "3xl": 28,
  full: 9999,
}

/** @type {const} */
const fontFamily = {
  sans: "Roboto_400Regular",
  sansMedium: "Roboto_500Medium",
  sansSemiBold: "Roboto_500Medium",
  sansBold: "Roboto_700Bold",
  serif: "Roboto_700Bold",
}

/**
 * Typography scale aligned to the redesign hierarchy.
 * Sizes are in px; line heights are absolute px values for React Native.
 */
/** @type {const} */
const typography = {
  fontSize: {
    screenTitle: 28,
    sectionTitle: 20,
    cardTitle: 16,
    body: 15,
    metadata: 13,
    button: 14,
  },
  lineHeight: {
    screenTitle: 34,
    sectionTitle: 26,
    cardTitle: 22,
    body: 22,
    metadata: 18,
    button: 20,
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
}

/** @type {const} */
const iconSize = {
  xs: 16,
  sm: 20,
  md: 22,
  lg: 24,
  xl: 28,
}

/** @type {const} */
const iconStroke = 1.75

/** Standard interactive component heights */
/** @type {const} */
const componentHeight = {
  xs: 40,
  sm: 44,
  md: 52,
  lg: 56,
  tab: 48,
  tabBar: 64,
}

/** @type {const} */
const shadows = {
  sm: {
    shadowColor: "#20251D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: "#20251D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  lg: {
    shadowColor: "#20251D",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 22,
    elevation: 8,
  },
}

/** @type {const} */
const animation = {
  duration: {
    fast: 150,
    normal: 220,
    slow: 360,
  },
}

module.exports = {
  colors,
  spacing,
  radius,
  fontFamily,
  typography,
  iconSize,
  iconStroke,
  componentHeight,
  shadows,
  animation,
}
