import { useState } from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Button } from "@/components/ui/button"
import { SECTION_GAP_CLASS } from "@/components/ui/section-header"
import { componentHeight, spacing } from "@/constants/theme"
import type { Recipe } from "@/data/recipes"
import { RecipeContentTabs, type RecipeContentTab } from "@/features/recipe/recipe-content-tabs"
import { RecipeHeader } from "@/features/recipe/recipe-header"
import { RecipeHero } from "@/features/recipe/recipe-hero"
import { RecipeIngredients } from "@/features/recipe/recipe-ingredients"
import { RecipeInstructions } from "@/features/recipe/recipe-instructions"
import { RecipeOptionalInfo } from "@/features/recipe/recipe-optional-info"

type RecipeContentProps = {
  recipe: Recipe
  isFavorite: boolean
  isFavoriteReady: boolean
  onFavoritePress?: () => void
  onBack: () => void
}

const BOTTOM_ACTION_VERTICAL_PADDING = spacing.md * 2

export function RecipeContent({
  recipe,
  isFavorite,
  isFavoriteReady,
  onFavoritePress,
  onBack,
}: RecipeContentProps) {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<RecipeContentTab>("ingredients")
  const bottomActionHeight =
    BOTTOM_ACTION_VERTICAL_PADDING + componentHeight.lg + Math.max(insets.bottom, spacing.md)

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: bottomActionHeight + spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        <RecipeHero
          recipe={recipe}
          isFavorite={isFavorite}
          isFavoriteReady={isFavoriteReady}
          onFavoritePress={onFavoritePress}
          onBack={onBack}
        />

        <RecipeHeader name={recipe.name} category={recipe.category} area={recipe.area} />

        <View className="px-xl pt-lg">
          <RecipeContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </View>

        {activeTab === "ingredients" ? (
          <RecipeIngredients ingredients={recipe.ingredients} />
        ) : (
          <RecipeInstructions instructions={recipe.instructions} />
        )}

        <RecipeOptionalInfo recipe={recipe} />
      </ScrollView>

      <View
        className="absolute inset-x-0 border-t border-border bg-surface-elevated px-xl py-md dark:border-border-dark dark:bg-surface-elevated-dark"
        style={{ bottom: 0, paddingBottom: Math.max(insets.bottom, spacing.md) }}
      >
        <Button
          label="Start cooking"
          accessibilityLabel="Start cooking, view instructions"
          onPress={() => setActiveTab("instructions")}
        />
      </View>
    </View>
  )
}
