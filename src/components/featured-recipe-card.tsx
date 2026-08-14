import { Link } from "expo-router"
import { memo } from "react"
import { View } from "react-native"

import { FavoriteButton } from "@/components/favorite-button"
import { RecipeImage } from "@/components/recipe-image"
import {
  FAVORITE_BUTTON_OFFSET_CLASS,
  FEATURED_IMAGE_ASPECT_CLASS,
  RECIPE_CARD_BORDER_CLASS,
  RECIPE_CARD_RADIUS_CLASS,
} from "@/components/recipe-cards/constants"
import { formatRecipeMeta } from "@/components/recipe-cards/format-recipe-meta"
import type { RecipeCardData } from "@/components/recipe-cards/types"
import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"
import { shadows } from "@/constants/theme"

type FeaturedRecipeCardProps = {
  recipe: RecipeCardData
}

function FeaturedRecipeCardComponent({ recipe }: FeaturedRecipeCardProps) {
  const meta = formatRecipeMeta(recipe)

  return (
    <View className="relative w-full">
      <Link href={`/recipe/${recipe.id}`} asChild>
        <PressableScale
          accessibilityRole="link"
          accessibilityLabel={`Featured recipe, ${recipe.name}`}
          style={shadows.md}
          className={`min-h-[44px] overflow-hidden ${RECIPE_CARD_RADIUS_CLASS} ${RECIPE_CARD_BORDER_CLASS} bg-surface-elevated dark:bg-surface-elevated-dark`}
        >
          <View className={`relative w-full ${FEATURED_IMAGE_ASPECT_CLASS}`}>
            <RecipeImage
              uri={recipe.imageUrl}
              recyclingKey={recipe.id}
              variant="full"
              priority="high"
              accessibilityLabel={`${recipe.name} photo`}
              className="h-full w-full"
            />
            <View className="absolute inset-x-0 bottom-0 bg-overlay px-lg py-md dark:bg-overlay-dark">
              <AppText variant="caption" tone="inverse" className="uppercase tracking-widest">
                Featured
              </AppText>
              <AppText variant="subtitle" tone="inverse" numberOfLines={2} className="mt-xs">
                {recipe.name}
              </AppText>
              {meta ? (
                <AppText variant="caption" tone="inverse" numberOfLines={1} className="mt-xs opacity-80">
                  {meta}
                </AppText>
              ) : null}
            </View>
          </View>
        </PressableScale>
      </Link>
      <View className={FAVORITE_BUTTON_OFFSET_CLASS}>
        <FavoriteButton recipe={recipe} variant="overlay" />
      </View>
    </View>
  )
}

export const FeaturedRecipeCard = memo(FeaturedRecipeCardComponent)
