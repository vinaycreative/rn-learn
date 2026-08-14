import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { useCallback } from "react"
import { Alert, View } from "react-native"
import Animated from "react-native-reanimated"
import { useShallow } from "zustand/react/shallow"

import { useBottomTabBarLayout } from "@/components/bottom-tab-bar"
import { RecipeCard } from "@/components/recipe-card"
import { ScreenHeader, SectionHeader, LIST_HEADER_PADDING_CLASS, SECTION_GAP_CLASS } from "@/components/ui/section-header"
import { spacing } from "@/constants/theme"
import { FavoritesEmpty, FavoritesHydrating } from "@/features/favorites/favorites-states"
import { motion } from "@/lib/motion"
import { selectFavorites, useFavoritesStore, type FavoriteRecipe } from "@/stores/favorites-store"

export function FavoritesScreen() {
  const { topInset, contentPaddingBottom } = useBottomTabBarLayout()
  const isHydrated = useFavoritesStore((state) => state.isHydrated)
  const favorites = useFavoritesStore(useShallow(selectFavorites))
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)

  const renderRecipe = useCallback<ListRenderItem<FavoriteRecipe>>(({ item }) => {
    return (
      <Animated.View
        className="flex-1 px-xs pb-md"
        layout={motion.layout}
        exiting={motion.fadeOut}
      >
        <RecipeCard recipe={item} showFavorite />
      </Animated.View>
    )
  }, [])

  const onClearPress = useCallback(() => {
    Alert.alert("Clear all favorites?", "This removes every saved recipe from this device.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear all",
        style: "destructive",
        onPress: () => {
          clearFavorites()
        },
      },
    ])
  }, [clearFavorites])

  const subtitle = isHydrated
    ? favorites.length === 1
      ? "1 saved recipe"
      : `${favorites.length} saved recipes`
    : "Loading saved recipes"

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingTop: topInset }}
    >
      <FlashList
        data={isHydrated ? favorites : []}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        extraData={{ isHydrated, count: favorites.length }}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: contentPaddingBottom,
        }}
        ListHeaderComponent={
          <View className={LIST_HEADER_PADDING_CLASS}>
            <ScreenHeader title="Favorites" subtitle={subtitle} />
            {isHydrated && favorites.length > 0 ? (
              <View className={SECTION_GAP_CLASS}>
                <SectionHeader
                  title="Saved recipes"
                  actionLabel="Clear all"
                  actionAccessibilityLabel="Clear all favorites"
                  actionTone="error"
                  onActionPress={onClearPress}
                />
              </View>
            ) : null}
          </View>
        }
        ListEmptyComponent={isHydrated ? <FavoritesEmpty /> : <FavoritesHydrating />}
      />
    </View>
  )
}
