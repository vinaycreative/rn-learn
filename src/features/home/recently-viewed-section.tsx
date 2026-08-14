import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { Link } from "expo-router"
import { useCallback } from "react"
import { Alert, Pressable, Text, View } from "react-native"
import { useShallow } from "zustand/react/shallow"

import { RecipeImage } from "@/components/recipe-image"
import { shadows, spacing } from "@/constants/theme"
import { SectionEmpty } from "@/features/home/section-state"
import {
  selectRecentlyViewed,
  useRecentlyViewedStore,
  type RecentlyViewedRecipe,
} from "@/stores/recently-viewed-store"

const CARD_WIDTH = 148

export function RecentlyViewedSection() {
  const isHydrated = useRecentlyViewedStore((state) => state.isHydrated)
  const recipes = useRecentlyViewedStore(useShallow(selectRecentlyViewed))
  const clearHistory = useRecentlyViewedStore((state) => state.clearHistory)

  const renderRecipe = useCallback<ListRenderItem<RecentlyViewedRecipe>>(({ item }) => {
    return (
      <View className="pr-md" style={{ width: CARD_WIDTH }}>
        <RecentlyViewedCard recipe={item} />
      </View>
    )
  }, [])

  const onClearPress = useCallback(() => {
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

  if (!isHydrated) {
    return (
      <View className="mt-xl">
        <Text className="mb-md text-lg font-semibold text-foreground dark:text-foreground-dark">
          Recently viewed
        </Text>
        <View
          className="h-44 w-full rounded-xl bg-surface dark:bg-surface-dark"
          accessibilityLabel="Loading recently viewed recipes"
        />
      </View>
    )
  }

  return (
    <View className="mt-xl">
      <View className="mb-md flex-row items-center justify-between">
        <Text className="flex-1 text-lg font-semibold text-foreground dark:text-foreground-dark">
          Recently viewed
        </Text>
        {recipes.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear recently viewed recipes"
            onPress={onClearPress}
            className="min-h-[44px] items-center justify-center px-sm"
          >
            <Text className="text-sm font-medium text-error dark:text-error-dark">Clear</Text>
          </Pressable>
        ) : null}
      </View>

      {recipes.length === 0 ? (
        <SectionEmpty message="Recipes you open will appear here so you can jump back in quickly." />
      ) : (
        <View style={{ height: 220 }}>
          <FlashList
            data={recipes}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderRecipe}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: spacing.lg }}
          />
        </View>
      )}
    </View>
  )
}

function RecentlyViewedCard({ recipe }: { recipe: RecentlyViewedRecipe }) {
  const meta = [recipe.category, recipe.area].filter(Boolean).join(" · ")

  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Recently viewed, ${recipe.name}`}
        style={shadows.sm}
        className="min-h-[44px] overflow-hidden rounded-xl border border-border bg-surface-elevated dark:border-border-dark dark:bg-surface-elevated-dark"
      >
        <RecipeImage uri={recipe.imageUrl} recyclingKey={recipe.id} className="aspect-square w-full" />
        <View className="px-sm py-sm">
          <Text
            numberOfLines={2}
            className="text-sm font-semibold leading-snug text-foreground dark:text-foreground-dark"
          >
            {recipe.name}
          </Text>
          {meta ? (
            <Text
              numberOfLines={1}
              className="mt-xs text-xs text-foreground-muted dark:text-foreground-muted-dark"
            >
              {meta}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Link>
  )
}
