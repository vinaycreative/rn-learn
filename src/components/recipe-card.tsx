import { Link } from "expo-router"
import { memo } from "react"
import { Pressable, Text, View } from "react-native"

import { RecipeImage } from "@/components/recipe-image"
import { shadows } from "@/constants/theme"
import type { RecipeSummary } from "@/data/recipes"

type RecipeCardRecipe = Pick<RecipeSummary, "id" | "name" | "imageUrl">

type RecipeCardProps = {
  recipe: RecipeCardRecipe
}

function RecipeCardComponent({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={recipe.name}
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
        </View>
      </Pressable>
    </Link>
  )
}

export const RecipeCard = memo(RecipeCardComponent)
