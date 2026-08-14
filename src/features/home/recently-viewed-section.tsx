import { Compass } from "lucide-react-native"
import { useCallback } from "react"
import { Alert, ScrollView, View } from "react-native"
import { useShallow } from "zustand/react/shallow"

import { HorizontalRecipeCard } from "@/components/horizontal-recipe-card"
import { SectionHeader, SECTION_GAP_CLASS } from "@/components/ui/section-header"
import { Skeleton } from "@/components/ui/skeleton"
import { spacing } from "@/constants/theme"
import { SectionEmpty } from "@/features/home/section-state"
import { selectRecentlyViewed, useRecentlyViewedStore } from "@/stores/recently-viewed-store"

export function RecentlyViewedSection() {
  const isHydrated = useRecentlyViewedStore((state) => state.isHydrated)
  const recipes = useRecentlyViewedStore(useShallow(selectRecentlyViewed))
  const clearHistory = useRecentlyViewedStore((state) => state.clearHistory)

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
      <View className={SECTION_GAP_CLASS}>
        <SectionHeader title="Recently viewed" />
        <Skeleton className="h-52 w-full rounded-3xl" accessibilityLabel="Loading recently viewed recipes" />
      </View>
    )
  }

  return (
    <View className={SECTION_GAP_CLASS}>
      <SectionHeader
        title="Recently viewed"
        actionLabel={recipes.length > 0 ? "Clear" : undefined}
        actionAccessibilityLabel="Clear recently viewed recipes"
        actionTone="error"
        onActionPress={recipes.length > 0 ? onClearPress : undefined}
      />

      {recipes.length === 0 ? (
        <SectionEmpty
          icon={Compass}
          title="Nothing here yet"
          message="Recipes you open will appear here so you can jump back in quickly."
        />
      ) : (
        <ScrollView
          horizontal
          accessibilityLabel="Recently viewed recipes"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: spacing.lg }}
        >
          {recipes.map((recipe) => (
            <View key={recipe.id} className="pr-md">
              <HorizontalRecipeCard recipe={recipe} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}
