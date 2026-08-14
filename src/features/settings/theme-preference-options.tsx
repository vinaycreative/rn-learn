import { Monitor, Moon, Sun } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { THEME_PREFERENCES, type ThemePreference } from "@/stores/preferences-store"

const THEME_OPTION_META: Record<
  ThemePreference,
  { label: string; accessibilityLabel: string; Icon: typeof Sun }
> = {
  system: {
    label: "System",
    accessibilityLabel: "Use system appearance",
    Icon: Monitor,
  },
  light: {
    label: "Light",
    accessibilityLabel: "Use light appearance",
    Icon: Sun,
  },
  dark: {
    label: "Dark",
    accessibilityLabel: "Use dark appearance",
    Icon: Moon,
  },
}

type ThemePreferenceOptionsProps = {
  value: ThemePreference
  onChange: (preference: ThemePreference) => void
  disabled?: boolean
}

export function ThemePreferenceOptions({
  value,
  onChange,
  disabled = false,
}: ThemePreferenceOptionsProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View accessibilityLabel="Appearance" className="flex-row gap-sm">
      {THEME_PREFERENCES.map((preference) => {
        const { label, accessibilityLabel, Icon } = THEME_OPTION_META[preference]
        const isSelected = preference === value

        return (
          <Pressable
            key={preference}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ selected: isSelected, disabled }}
            disabled={disabled}
            onPress={() => onChange(preference)}
            className={`min-h-[44px] flex-1 items-center justify-center rounded-xl px-sm py-md ${
              isSelected
                ? "bg-primary dark:bg-primary-dark"
                : "bg-surface dark:bg-surface-dark"
            }`}
          >
            <Icon
              color={isSelected ? palette.primaryForeground : palette.foregroundMuted}
              size={20}
            />
            <Text
              className={`mt-xs text-sm font-medium ${
                isSelected
                  ? "text-primary-foreground dark:text-primary-foreground-dark"
                  : "text-foreground dark:text-foreground-dark"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
