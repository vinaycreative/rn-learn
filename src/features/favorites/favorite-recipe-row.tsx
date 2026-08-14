import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"

import { FavoriteButton } from "@/components/favorite-button"
import { RecipeImage } from "@/components/recipe-image"
import { shadows } from "@/constants/theme"
import type { FavoriteRecipe } from "@/stores/favorites-store"

type FavoriteRecipeRowProps = {
  recipe: FavoriteRecipe
}

export function FavoriteRecipeRow({ recipe }: FavoriteRecipeRowProps) {
  const meta = [recipe.category, recipe.area].filter(Boolean).join(" · ")

  return (
    <View
      style={shadows.sm}
      className="flex-row items-center overflow-hidden rounded-xl border border-border bg-surface-elevated dark:border-border-dark dark:bg-surface-elevated-dark"
    >
      <Link href={`/recipe/${recipe.id}`} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={recipe.name}
          className="min-h-[44px] min-w-0 flex-1 flex-row items-center"
        >
          <View className="h-24 w-24">
            <RecipeImage uri={recipe.imageUrl} recyclingKey={recipe.id} className="h-full w-full" />
          </View>
          <View className="min-w-0 flex-1 px-md py-sm">
            <Text
              numberOfLines={2}
              className="text-base font-semibold text-foreground dark:text-foreground-dark"
            >
              {recipe.name}
            </Text>
            {meta ? (
              <Text
                numberOfLines={1}
                className="mt-xs text-sm text-foreground-muted dark:text-foreground-muted-dark"
              >
                {meta}
              </Text>
            ) : null}
          </View>
        </Pressable>
      </Link>
      <View className="pr-sm">
        <FavoriteButton recipe={recipe} />
      </View>
    </View>
  )
}
