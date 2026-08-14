import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { Heart } from "lucide-react-native"
import { useCallback } from "react"
import { Alert, Pressable, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useShallow } from "zustand/react/shallow"

import { colors, spacing } from "@/constants/theme"
import { FavoriteRecipeRow } from "@/features/favorites/favorite-recipe-row"
import { FavoritesEmpty, FavoritesHydrating } from "@/features/favorites/favorites-states"
import { useColorScheme } from "@/hooks/use-color-scheme"
import {
  selectFavorites,
  useFavoritesStore,
  type FavoriteRecipe,
} from "@/stores/favorites-store"

export function FavoritesScreen() {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const isHydrated = useFavoritesStore((state) => state.isHydrated)
  const favorites = useFavoritesStore(useShallow(selectFavorites))
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)

  const renderRecipe = useCallback<ListRenderItem<FavoriteRecipe>>(({ item }) => {
    return (
      <View className="pb-md">
        <FavoriteRecipeRow recipe={item} />
      </View>
    )
  }, [])

  const onClearPress = useCallback(() => {
    Alert.alert(
      "Clear all favorites?",
      "This removes every saved recipe from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear all",
          style: "destructive",
          onPress: () => {
            clearFavorites()
          },
        },
      ],
    )
  }, [clearFavorites])

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      <FlashList
        data={isHydrated ? favorites : []}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        extraData={{ isHydrated, count: favorites.length }}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing["2xl"],
        }}
        ListHeaderComponent={
          <View className="pb-xl">
            <View className="min-h-[44px] flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary dark:bg-primary-dark">
                <Heart color={palette.primaryForeground} size={22} />
              </View>
              <View className="ml-md flex-1">
                <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
                  Favorites
                </Text>
                <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
                  {isHydrated
                    ? favorites.length === 1
                      ? "1 saved recipe"
                      : `${favorites.length} saved recipes`
                    : "Loading saved recipes"}
                </Text>
              </View>
              {isHydrated && favorites.length > 0 ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear all favorites"
                  onPress={onClearPress}
                  className="min-h-[44px] items-center justify-center px-sm"
                >
                  <Text className="text-sm font-medium text-error dark:text-error-dark">
                    Clear all
                  </Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        }
        ListEmptyComponent={isHydrated ? <FavoritesEmpty /> : <FavoritesHydrating />}
      />
    </View>
  )
}
