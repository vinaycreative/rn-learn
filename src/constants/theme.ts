import { type TextStyle } from "react-native"

import rawTokens from "./theme.tokens.js"

/**
 * Semantic design tokens for Recipe Explorer.
 * Canonical values live in `theme.tokens.js` and are mirrored in `tailwind.config.js`.
 */

export const colors = rawTokens.colors
export const spacing = rawTokens.spacing
export const radius = rawTokens.radius
export const fontFamily = rawTokens.fontFamily
export const typography = rawTokens.typography
export const iconSize = rawTokens.iconSize
export const iconStroke = rawTokens.iconStroke
export const componentHeight = rawTokens.componentHeight
export const shadows = rawTokens.shadows
export const animation = rawTokens.animation

export type ColorSchemeName = keyof typeof colors
export type SemanticColor = keyof typeof colors.light

export type AppTextVariant = keyof typeof textVariants

/**
 * Typography presets for `AppText` and programmatic styling.
 * Uses loaded Roboto font files; avoid fontWeight overrides that bypass custom fonts.
 */
export const textVariants = {
  display: {
    fontFamily: fontFamily.sansBold,
    fontSize: typography.fontSize.screenTitle,
    lineHeight: typography.lineHeight.screenTitle,
  },
  title: {
    fontFamily: fontFamily.sansMedium,
    fontSize: typography.fontSize.sectionTitle,
    lineHeight: typography.lineHeight.sectionTitle,
  },
  subtitle: {
    fontFamily: fontFamily.sansMedium,
    fontSize: typography.fontSize.cardTitle,
    lineHeight: typography.lineHeight.cardTitle,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: typography.fontSize.metadata,
    lineHeight: typography.lineHeight.metadata,
  },
  label: {
    fontFamily: fontFamily.sansMedium,
    fontSize: typography.fontSize.button,
    lineHeight: typography.lineHeight.button,
  },
} satisfies Record<string, TextStyle>

/** @deprecated Use `fontFamily` instead. Kept for legacy template imports. */
export const Fonts = {
  sans: fontFamily.sans,
  serif: fontFamily.serif,
  sansMedium: fontFamily.sansMedium,
  sansSemiBold: fontFamily.sansSemiBold,
  sansBold: fontFamily.sansBold,
} as const

/**
 * Compatibility palette for navigation chrome and leftover template helpers.
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
