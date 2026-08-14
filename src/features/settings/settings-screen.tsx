import Constants from "expo-constants"
import { Database, Heart, History, Settings } from "lucide-react-native"
import { useCallback, type ReactNode } from "react"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { colors, spacing } from "@/constants/theme"
import { ThemePreferenceOptions } from "@/features/settings/theme-preference-options"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { useFavoritesStore } from "@/stores/favorites-store"
import { usePreferencesStore } from "@/stores/preferences-store"
import { useRecentlyViewedStore } from "@/stores/recently-viewed-store"

const APP_NAME = "Recipe Explorer"
const RECIPE_DATA_PROVIDER = "TheMealDB"

export function SettingsScreen() {
  const insets = useSafeAreaInsets()
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
    Alert.alert(
      "Clear all favorites?",
      "This removes every saved recipe from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear favorites",
          style: "destructive",
          onPress: () => {
            clearFavorites()
          },
        },
      ],
    )
  }, [clearFavorites])

  const onClearRecentlyViewed = useCallback(() => {
    Alert.alert(
      "Clear recently viewed?",
      "This removes your local recipe history from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear history",
          style: "destructive",
          onPress: () => {
            clearHistory()
          },
        },
      ],
    )
  }, [clearHistory])

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing["2xl"],
        }}
      >
        <View className="min-h-[44px] flex-row items-center pb-xl">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary dark:bg-primary-dark">
            <Settings color={palette.primaryForeground} size={22} />
          </View>
          <View className="ml-md flex-1">
            <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
              Settings
            </Text>
            <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
              Preferences and local data
            </Text>
          </View>
        </View>

        <Text className="mb-md text-lg font-semibold text-foreground dark:text-foreground-dark">
          Appearance
        </Text>
        <ThemePreferenceOptions
          value={themePreference}
          onChange={setThemePreference}
          disabled={!isPreferencesHydrated}
        />
        <Text className="mt-sm text-sm text-foreground-muted dark:text-foreground-muted-dark">
          {isPreferencesHydrated
            ? "System follows this device. Light and dark stay fixed."
            : "Loading saved appearance"}
        </Text>

        <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
          Local data
        </Text>
        <View className="overflow-hidden rounded-xl bg-surface dark:bg-surface-dark">
          <SettingsActionRow
            icon={<Heart color={palette.error} size={20} />}
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
            icon={<History color={palette.error} size={20} />}
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
        </View>

        <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
          About
        </Text>
        <View className="overflow-hidden rounded-xl bg-surface dark:bg-surface-dark">
          <AboutRow label="App" value={APP_NAME} />
          <View className="border-t border-border dark:border-border-dark" />
          <AboutRow label="Version" value={appVersion} />
          <View className="border-t border-border dark:border-border-dark" />
          <View className="min-h-[44px] flex-row items-center px-lg py-md">
            <Database color={palette.foregroundMuted} size={20} />
            <View className="ml-md flex-1">
              <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
                Recipe data
              </Text>
              <Text className="text-base font-medium text-foreground dark:text-foreground-dark">
                {RECIPE_DATA_PROVIDER}
              </Text>
            </View>
          </View>
        </View>
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
      className={`min-h-[44px] flex-row items-center px-lg py-md ${disabled ? "opacity-50" : ""}`}
    >
      {icon}
      <View className="ml-md flex-1">
        <Text className="text-base font-medium text-error dark:text-error-dark">{label}</Text>
        <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">{detail}</Text>
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
    <View className="min-h-[44px] justify-center px-lg py-md">
      <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">{label}</Text>
      <Text className="text-base font-medium text-foreground dark:text-foreground-dark">{value}</Text>
    </View>
  )
}
