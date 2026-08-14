import Constants from "expo-constants"
import { Database, Heart, History } from "lucide-react-native"
import { useCallback, type ReactNode } from "react"
import { Alert, Pressable, ScrollView, View } from "react-native"
import { useBottomTabBarLayout } from "@/components/bottom-tab-bar"
import { AppText } from "@/components/ui/app-text"
import { ScreenHeader, SECTION_GAP_CLASS } from "@/components/ui/section-header"
import { Surface } from "@/components/ui/surface"
import { colors, iconStroke, spacing } from "@/constants/theme"
import { ThemePreferenceOptions } from "@/features/settings/theme-preference-options"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { useFavoritesStore } from "@/stores/favorites-store"
import { usePreferencesStore } from "@/stores/preferences-store"
import { useRecentlyViewedStore } from "@/stores/recently-viewed-store"

const APP_NAME = "Recipe Explorer"
const RECIPE_DATA_PROVIDER = "TheMealDB"

export function SettingsScreen() {
  const { topInset, contentPaddingBottom } = useBottomTabBarLayout()
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const isPreferencesHydrated = usePreferencesStore((state) => state.isHydrated)
  const themePreference = usePreferencesStore((state) => state.themePreference)
  const setThemePreference = usePreferencesStore((state) => state.setThemePreference)
  const isFavoritesHydrated = useFavoritesStore((state) => state.isHydrated)
  const favoriteCount = useFavoritesStore((state) => state.ids.length)
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)
  const isHistoryHydrated = useRecentlyViewedStore((state) => state.isHydrated)
  const recentlyViewedCount = useRecentlyViewedStore((state) => state.ids.length)
  const clearHistory = useRecentlyViewedStore((state) => state.clearHistory)
  const appVersion = Constants.expoConfig?.version ?? "1.0.0"
  const canClearFavorites = isFavoritesHydrated && favoriteCount > 0
  const canClearHistory = isHistoryHydrated && recentlyViewedCount > 0

  const onClearFavorites = useCallback(() => {
    Alert.alert("Clear all favorites?", "This removes every saved recipe from this device.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear favorites",
        style: "destructive",
        onPress: () => {
          clearFavorites()
        },
      },
    ])
  }, [clearFavorites])

  const onClearRecentlyViewed = useCallback(() => {
    Alert.alert("Clear recently viewed?", "This removes your local recipe history from this device.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear history",
        style: "destructive",
        onPress: () => {
          clearHistory()
        },
      },
    ])
  }, [clearHistory])

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingTop: topInset }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: contentPaddingBottom,
        }}
      >
        <ScreenHeader title="Settings" subtitle="Appearance, local data, and about" />

        <AppText variant="label" tone="muted" className="mb-sm mt-lg uppercase tracking-widest">
          Appearance
        </AppText>
        <ThemePreferenceOptions
          value={themePreference}
          onChange={setThemePreference}
          disabled={!isPreferencesHydrated}
        />
        <AppText variant="caption" tone="muted" className="mt-sm">
          {isPreferencesHydrated
            ? "System follows this device. Light and dark stay fixed."
            : "Loading saved appearance"}
        </AppText>

        <AppText variant="label" tone="muted" className={`mb-sm ${SECTION_GAP_CLASS} uppercase tracking-widest`}>
          Local data
        </AppText>
        <Surface>
          <SettingsActionRow
            icon={<Heart color={palette.error} size={20} strokeWidth={iconStroke} />}
            label="Clear favorites"
            detail={
              isFavoritesHydrated
                ? favoriteCount === 1
                  ? "1 saved recipe"
                  : `${favoriteCount} saved recipes`
                : "Loading favorites"
            }
            disabled={!canClearFavorites}
            onPress={onClearFavorites}
          />
          <View className="border-t border-border dark:border-border-dark" />
          <SettingsActionRow
            icon={<History color={palette.error} size={20} strokeWidth={iconStroke} />}
            label="Clear recently viewed"
            detail={
              isHistoryHydrated
                ? recentlyViewedCount === 1
                  ? "1 viewed recipe"
                  : `${recentlyViewedCount} viewed recipes`
                : "Loading history"
            }
            disabled={!canClearHistory}
            onPress={onClearRecentlyViewed}
          />
        </Surface>

        <AppText variant="label" tone="muted" className={`mb-sm ${SECTION_GAP_CLASS} uppercase tracking-widest`}>
          About
        </AppText>
        <Surface>
          <AboutRow label="App" value={APP_NAME} />
          <View className="border-t border-border dark:border-border-dark" />
          <AboutRow label="Version" value={appVersion} />
          <View className="border-t border-border dark:border-border-dark" />
          <View className="min-h-[52px] flex-row items-center px-lg py-md">
            <Database color={palette.foregroundMuted} size={20} strokeWidth={iconStroke} />
            <View className="ml-md flex-1">
              <AppText variant="caption" tone="muted">
                Recipe data
              </AppText>
              <AppText variant="label" className="mt-xs">
                {RECIPE_DATA_PROVIDER}
              </AppText>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </View>
  )
}

type SettingsActionRowProps = {
  icon: ReactNode
  label: string
  detail: string
  disabled: boolean
  onPress: () => void
}

function SettingsActionRow({ icon, label, detail, disabled, onPress }: SettingsActionRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Requires confirmation"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[52px] flex-row items-center px-lg py-md ${disabled ? "opacity-50" : ""}`}
    >
      {icon}
      <View className="ml-md flex-1">
        <AppText variant="label" tone="error">
          {label}
        </AppText>
        <AppText variant="caption" tone="muted" className="mt-xs">
          {detail}
        </AppText>
      </View>
    </Pressable>
  )
}

type AboutRowProps = {
  label: string
  value: string
}

function AboutRow({ label, value }: AboutRowProps) {
  return (
    <View className="min-h-[52px] justify-center px-lg py-md">
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
      <AppText variant="label" className="mt-xs">
        {value}
      </AppText>
    </View>
  )
}
