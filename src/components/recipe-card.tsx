import { Link } from "expo-router"
import { memo } from "react"
import { Pressable, Text, View } from "react-native"

import { FavoriteButton } from "@/components/favorite-button"
import { RecipeImage } from "@/components/recipe-image"
import { shadows } from "@/constants/theme"
import type { RecipeSummary } from "@/data/recipes"

type RecipeCardRecipe = Pick<RecipeSummary, "id" | "name" | "imageUrl"> & {
  category?: string | null
  area?: string | null
}

type RecipeCardProps = {
  recipe: RecipeCardRecipe
  showFavorite?: boolean
}

function RecipeCardComponent({ recipe, showFavorite = false }: RecipeCardProps) {
  return (
    <View className="relative">
      <Link href={`/recipe/${recipe.id}`} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={recipe.name}
          style={shadows.sm}
          className="min-h-[44px] overflow-hidden rounded-xl border border-border bg-surface-elevated dark:border-border-dark dark:bg-surface-elevated-dark"
        >
          <RecipeImage
            uri={recipe.imageUrl}
            recyclingKey={recipe.id}
            accessibilityLabel={`${recipe.name} photo`}
            className="aspect-square w-full"
          />
          <View className="px-sm py-sm">
            <Text
              numberOfLines={2}
              className="text-sm font-semibold leading-snug text-foreground dark:text-foreground-dark"
            >
              {recipe.name}
            </Text>
          </View>
        </Pressable>
      </Link>
      {showFavorite ? (
        <View className="absolute right-sm top-sm">
          <FavoriteButton recipe={recipe} variant="overlay" />
        </View>
      ) : null}
    </View>
  )
}

export const RecipeCard = memo(RecipeCardComponent)
