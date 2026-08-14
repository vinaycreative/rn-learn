import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import * as Haptics from "expo-haptics"
import { Heart, House, Search, Settings, type LucideIcon } from "lucide-react-native"
import { Platform, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import {
  BOTTOM_TAB_BAR_HEIGHT,
  BOTTOM_TAB_BAR_HORIZONTAL_INSET,
  getBottomTabBarBottomOffset,
  getBottomTabBarContentPadding,
} from "@/components/bottom-tab-bar-layout"
import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"
import { colors, componentHeight, iconSize, iconStroke, radius, shadows } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { pressScale } from "@/lib/motion"

export {
  BOTTOM_TAB_BAR_CONTENT_GAP,
  BOTTOM_TAB_BAR_HEIGHT,
  BOTTOM_TAB_BAR_HORIZONTAL_INSET,
  BOTTOM_TAB_BAR_MIN_BOTTOM_INSET,
  getBottomTabBarBottomOffset,
  getBottomTabBarContentPadding,
} from "@/components/bottom-tab-bar-layout"

export function useBottomTabBarLayout() {
  const insets = useSafeAreaInsets()

  return {
    topInset: insets.top,
    contentPaddingBottom: getBottomTabBarContentPadding(insets.bottom),
    tabBarBottomOffset: getBottomTabBarBottomOffset(insets.bottom),
  }
}

const TAB_ICONS: Record<string, LucideIcon> = {
  index: House,
  explore: Search,
  favorites: Heart,
  settings: Settings,
}

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const bottomOffset = getBottomTabBarBottomOffset(insets.bottom)

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: BOTTOM_TAB_BAR_HORIZONTAL_INSET,
        right: BOTTOM_TAB_BAR_HORIZONTAL_INSET,
        bottom: bottomOffset,
      }}
    >
      <View
        accessibilityRole="tablist"
        style={[
          shadows.lg,
          {
            backgroundColor: palette.surfaceFloating,
            height: BOTTOM_TAB_BAR_HEIGHT,
            borderRadius: radius.full,
          },
        ]}
        className="flex-row items-center px-sm"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index
          const label = options.title ?? route.name
          const accessibilityLabel = options.tabBarAccessibilityLabel ?? label
          const Icon = TAB_ICONS[route.name] ?? House

          return (
            <TabItem
              key={route.key}
              label={label}
              accessibilityLabel={accessibilityLabel}
              icon={Icon}
              focused={isFocused}
              color={isFocused ? palette.primaryForeground : palette.foregroundMuted}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                })

                if (process.env.EXPO_OS === "ios") {
                  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params)
                }
              }}
              onLongPress={() => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                })
              }}
            />
          )
        })}
      </View>
    </View>
  )
}

type TabItemProps = {
  label: string
  accessibilityLabel: string
  icon: LucideIcon
  focused: boolean
  color: string
  onPress: () => void
  onLongPress: () => void
}

function TabItem({
  label,
  accessibilityLabel,
  icon: Icon,
  focused,
  color,
  onPress,
  onLongPress,
}: TabItemProps) {
  return (
    <PressableScale
      accessibilityRole="tab"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: focused }}
      onPress={onPress}
      onLongPress={onLongPress}
      scaleTo={pressScale.iconPressed}
      className="flex-1 items-center justify-center"
      style={{ minHeight: componentHeight.tab }}
    >
      <View
        className={`flex-row items-center justify-center rounded-full px-md ${
          focused ? "bg-primary dark:bg-primary-dark" : ""
        }`}
        style={{ minHeight: componentHeight.tab }}
      >
        <Icon
          color={color}
          size={iconSize.md}
          strokeWidth={iconStroke}
          fill={focused && Icon === Heart ? color : "transparent"}
        />
        {focused ? (
          <AppText
            variant="label"
            tone="onPrimary"
            numberOfLines={1}
            className="ml-sm"
            style={Platform.select({ android: { includeFontPadding: false } })}
          >
            {label}
          </AppText>
        ) : null}
      </View>
    </PressableScale>
  )
}
