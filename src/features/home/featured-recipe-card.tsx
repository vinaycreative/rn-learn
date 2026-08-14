import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"

import { RecipeImage } from "@/components/recipe-image"
import { shadows } from "@/constants/theme"
import type { Recipe } from "@/data/recipes"

type FeaturedRecipeCardProps = {
  recipe: Recipe
}

export function FeaturedRecipeCard({ recipe }: FeaturedRecipeCardProps) {
  const meta = [recipe.category, recipe.area].filter(Boolean).join(" · ")

  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Featured recipe, ${recipe.name}`}
        style={shadows.md}
        className="min-h-[44px] overflow-hidden rounded-xl border border-border bg-surface-elevated dark:border-border-dark dark:bg-surface-elevated-dark"
      >
        <View className="h-56 w-full">
          <RecipeImage uri={recipe.imageUrl} recyclingKey={recipe.id} className="h-full w-full" />
          <View className="absolute inset-x-0 bottom-0 bg-black/55 px-lg py-md">
            <Text className="text-xs font-medium uppercase tracking-wide text-white/80">Featured</Text>
            <Text numberOfLines={2} className="mt-xs text-xl font-bold text-white">
              {recipe.name}
            </Text>
            {meta ? (
              <Text numberOfLines={1} className="mt-xs text-sm text-white/80">
                {meta}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
