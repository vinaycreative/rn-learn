const tokens = require("./src/constants/theme.tokens.js")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: tokens.colors.light.background,
          dark: tokens.colors.dark.background,
        },
        surface: {
          DEFAULT: tokens.colors.light.surface,
          dark: tokens.colors.dark.surface,
          elevated: tokens.colors.light.surfaceElevated,
          "elevated-dark": tokens.colors.dark.surfaceElevated,
        },
        foreground: {
          DEFAULT: tokens.colors.light.foreground,
          dark: tokens.colors.dark.foreground,
          muted: tokens.colors.light.foregroundMuted,
          "muted-dark": tokens.colors.dark.foregroundMuted,
        },
        primary: {
          DEFAULT: tokens.colors.light.primary,
          soft: tokens.colors.light.primarySoft,
          foreground: tokens.colors.light.primaryForeground,
          dark: tokens.colors.dark.primary,
          "soft-dark": tokens.colors.dark.primarySoft,
          "foreground-dark": tokens.colors.dark.primaryForeground,
        },
        border: {
          DEFAULT: tokens.colors.light.border,
          dark: tokens.colors.dark.border,
        },
        overlay: {
          DEFAULT: tokens.colors.light.overlay,
          dark: tokens.colors.dark.overlay,
        },
        success: {
          DEFAULT: tokens.colors.light.success,
          dark: tokens.colors.dark.success,
        },
        warning: {
          DEFAULT: tokens.colors.light.warning,
          dark: tokens.colors.dark.warning,
        },
        error: {
          DEFAULT: tokens.colors.light.error,
          dark: tokens.colors.dark.error,
        },
        favorite: {
          DEFAULT: tokens.colors.light.favorite,
          dark: tokens.colors.dark.favorite,
        },
      },
      fontFamily: {
        sans: [tokens.fontFamily.sans],
        "sans-medium": [tokens.fontFamily.sansMedium],
        "sans-semibold": [tokens.fontFamily.sansSemiBold],
        "sans-bold": [tokens.fontFamily.sansBold],
        serif: [tokens.fontFamily.serif],
      },
      fontSize: {
        "screen-title": [
          `${tokens.typography.fontSize.screenTitle}px`,
          { lineHeight: `${tokens.typography.lineHeight.screenTitle}px` },
        ],
        "section-title": [
          `${tokens.typography.fontSize.sectionTitle}px`,
          { lineHeight: `${tokens.typography.lineHeight.sectionTitle}px` },
        ],
        "card-title": [
          `${tokens.typography.fontSize.cardTitle}px`,
          { lineHeight: `${tokens.typography.lineHeight.cardTitle}px` },
        ],
        body: [`${tokens.typography.fontSize.body}px`, { lineHeight: `${tokens.typography.lineHeight.body}px` }],
        metadata: [
          `${tokens.typography.fontSize.metadata}px`,
          { lineHeight: `${tokens.typography.lineHeight.metadata}px` },
        ],
        button: [`${tokens.typography.fontSize.button}px`, { lineHeight: `${tokens.typography.lineHeight.button}px` }],
      },
      spacing: {
        xs: `${tokens.spacing.xs}px`,
        sm: `${tokens.spacing.sm}px`,
        md: `${tokens.spacing.md}px`,
        lg: `${tokens.spacing.lg}px`,
        xl: `${tokens.spacing.xl}px`,
        section: `${tokens.spacing.section}px`,
        "2xl": `${tokens.spacing["2xl"]}px`,
        "3xl": `${tokens.spacing["3xl"]}px`,
      },
      borderRadius: {
        sm: `${tokens.radius.sm}px`,
        md: `${tokens.radius.md}px`,
        lg: `${tokens.radius.lg}px`,
        xl: `${tokens.radius.xl}px`,
        "2xl": `${tokens.radius["2xl"]}px`,
        card: `${tokens.radius.card}px`,
        "3xl": `${tokens.radius["3xl"]}px`,
      },
      height: {
        "component-xs": `${tokens.componentHeight.xs}px`,
        "component-sm": `${tokens.componentHeight.sm}px`,
        "component-md": `${tokens.componentHeight.md}px`,
        "component-lg": `${tokens.componentHeight.lg}px`,
        tab: `${tokens.componentHeight.tab}px`,
        "tab-bar": `${tokens.componentHeight.tabBar}px`,
      },
      minHeight: {
        "component-xs": `${tokens.componentHeight.xs}px`,
        "component-sm": `${tokens.componentHeight.sm}px`,
        "component-md": `${tokens.componentHeight.md}px`,
        "component-lg": `${tokens.componentHeight.lg}px`,
        tab: `${tokens.componentHeight.tab}px`,
        "tab-bar": `${tokens.componentHeight.tabBar}px`,
      },
      width: {
        "icon-xs": `${tokens.iconSize.xs}px`,
        "icon-sm": `${tokens.iconSize.sm}px`,
        "icon-md": `${tokens.iconSize.md}px`,
        "icon-lg": `${tokens.iconSize.lg}px`,
        "icon-xl": `${tokens.iconSize.xl}px`,
      },
      size: {
        "icon-xs": `${tokens.iconSize.xs}px`,
        "icon-sm": `${tokens.iconSize.sm}px`,
        "icon-md": `${tokens.iconSize.md}px`,
        "icon-lg": `${tokens.iconSize.lg}px`,
        "icon-xl": `${tokens.iconSize.xl}px`,
      },
      transitionDuration: {
        fast: `${tokens.animation.duration.fast}ms`,
        normal: `${tokens.animation.duration.normal}ms`,
        slow: `${tokens.animation.duration.slow}ms`,
      },
    },
  },
  plugins: [],
}
