import { Heart } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

export function FavoritesEmpty() {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View className="items-center rounded-xl bg-surface px-lg py-2xl dark:bg-surface-dark">
      <View className="h-14 w-14 items-center justify-center rounded-full bg-background dark:bg-background-dark">
        <Heart color={palette.primary} size={24} />
      </View>
      <Text className="mt-lg text-center text-base font-semibold text-foreground dark:text-foreground-dark">
        No favorites yet
      </Text>
      <Text className="mt-sm text-center text-sm text-foreground-muted dark:text-foreground-muted-dark">
        Save recipes from details or recipe cards and they will appear here.
      </Text>
    </View>
  )
}

export function FavoritesHydrating() {
  return (
    <View accessibilityLabel="Loading favorites">
      {Array.from({ length: 4 }, (_, index) => (
        <View
          key={index}
          className="mb-md h-24 w-full rounded-xl bg-surface dark:bg-surface-dark"
        />
      ))}
    </View>
  )
}
