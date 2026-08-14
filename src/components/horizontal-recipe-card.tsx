import { Link } from "expo-router"
import { memo } from "react"
import { View } from "react-native"

import { RecipeImage } from "@/components/recipe-image"
import {
  HORIZONTAL_CARD_WIDTH,
  HORIZONTAL_IMAGE_ASPECT_CLASS,
  RECIPE_CARD_BORDER_CLASS,
  RECIPE_CARD_RADIUS_CLASS,
} from "@/components/recipe-cards/constants"
import { formatRecipeMeta } from "@/components/recipe-cards/format-recipe-meta"
import { RecipeCardBody } from "@/components/recipe-cards/recipe-card-body"
import type { RecipeCardData } from "@/components/recipe-cards/types"
import { PressableScale } from "@/components/ui/pressable-scale"
import { shadows } from "@/constants/theme"

type HorizontalRecipeCardProps = {
  recipe: RecipeCardData
}

function HorizontalRecipeCardComponent({ recipe }: HorizontalRecipeCardProps) {
  const meta = formatRecipeMeta(recipe)

  return (
    <View className="relative" style={{ width: HORIZONTAL_CARD_WIDTH }}>
      <Link href={`/recipe/${recipe.id}`} asChild>
        <PressableScale
          accessibilityRole="link"
          accessibilityLabel={recipe.name}
          style={shadows.sm}
          className={`min-h-[44px] overflow-hidden ${RECIPE_CARD_RADIUS_CLASS} ${RECIPE_CARD_BORDER_CLASS} bg-surface-elevated dark:bg-surface-elevated-dark`}
        >
          <RecipeImage
            uri={recipe.imageUrl}
            recyclingKey={recipe.id}
            variant="card"
            accessibilityLabel={`${recipe.name} photo`}
            className={`w-full ${HORIZONTAL_IMAGE_ASPECT_CLASS}`}
          />
          <RecipeCardBody title={recipe.name} meta={meta} size="horizontal" />
        </PressableScale>
      </Link>
    </View>
  )
}

export const HorizontalRecipeCard = memo(HorizontalRecipeCardComponent)
