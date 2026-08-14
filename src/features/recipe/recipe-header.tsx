import { AppText } from "@/components/ui/app-text"
import type { Recipe } from "@/data/recipes"
import { View } from "react-native"

type RecipeHeaderProps = Pick<Recipe, "name" | "category" | "area">

export function RecipeHeader({ name, category, area }: RecipeHeaderProps) {
  const categoryLabel = category?.trim() ?? ""
  const cuisineLabel = area?.trim() ?? ""

  return (
    <View className="-mt-8 rounded-t-3xl bg-background px-xl pb-lg pt-xl dark:bg-background-dark">
      <AppText variant="title">{name}</AppText>
      {categoryLabel || cuisineLabel ? (
        <View className="mt-sm flex-row flex-wrap items-center gap-x-sm gap-y-xs">
          {categoryLabel ? (
            <AppText variant="caption" tone="muted">
              {categoryLabel}
            </AppText>
          ) : null}
          {categoryLabel && cuisineLabel ? (
            <AppText variant="caption" tone="muted" accessibilityElementsHidden importantForAccessibility="no">
              ·
            </AppText>
          ) : null}
          {cuisineLabel ? (
            <AppText variant="caption" tone="muted">
              {cuisineLabel}
            </AppText>
          ) : null}
        </View>
      ) : null}
    </View>
  )
}
