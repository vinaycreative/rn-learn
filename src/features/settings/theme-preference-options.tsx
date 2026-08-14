import { Monitor, Moon, Sun } from "lucide-react-native"
import { useEffect } from "react"
import { Pressable, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

import { AppText } from "@/components/ui/app-text"
import { colors, iconStroke } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { springs } from "@/lib/motion"
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
  const selectedIndex = THEME_PREFERENCES.indexOf(value)
  const trackWidth = useSharedValue(0)
  const index = useSharedValue(Math.max(selectedIndex, 0))

  useEffect(() => {
    index.value = withSpring(Math.max(selectedIndex, 0), springs.snappy)
  }, [index, selectedIndex])

  const indicatorStyle = useAnimatedStyle(() => {
    const width = trackWidth.value / THEME_PREFERENCES.length

    return {
      width,
      transform: [{ translateX: index.value * width }],
    }
  })

  return (
    <View
      accessibilityLabel="Appearance"
      className="relative flex-row rounded-2xl bg-surface p-xs dark:bg-surface-dark"
      onLayout={(event) => {
        trackWidth.value = event.nativeEvent.layout.width - 8
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={indicatorStyle}
        className="absolute bottom-xs top-xs rounded-xl bg-primary dark:bg-primary-dark"
      />
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
            className="z-10 min-h-[72px] flex-1 items-center justify-center px-sm py-md"
          >
            <Icon
              color={isSelected ? palette.primaryForeground : palette.foregroundMuted}
              size={20}
              strokeWidth={iconStroke}
            />
            <AppText variant="label" tone={isSelected ? "onPrimary" : "default"} className="mt-xs">
              {label}
            </AppText>
          </Pressable>
        )
      })}
    </View>
  )
}
