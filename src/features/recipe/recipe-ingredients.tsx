import { Text, View } from "react-native"

import type { RecipeIngredient } from "@/data/recipes"

type RecipeIngredientsProps = {
  ingredients: RecipeIngredient[]
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  const visibleIngredients = ingredients.filter((ingredient) => ingredient.name.trim().length > 0)

  if (visibleIngredients.length === 0) {
    return null
  }

  return (
    <View className="mt-xl px-lg">
      <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark">Ingredients</Text>
      <View className="mt-md overflow-hidden rounded-xl bg-surface dark:bg-surface-dark">
        {visibleIngredients.map((ingredient, index) => {
          const measure = ingredient.measure.trim()

          return (
            <View
              key={`${ingredient.name}-${index}`}
              className={`min-h-[44px] flex-row items-center justify-between px-lg py-md ${
                index < visibleIngredients.length - 1 ? "border-b border-border dark:border-border-dark" : ""
              }`}
            >
              <Text className="flex-1 text-base text-foreground dark:text-foreground-dark">{ingredient.name}</Text>
              {measure ? (
                <Text className="ml-md text-right text-sm text-foreground-muted dark:text-foreground-muted-dark">
                  {measure}
                </Text>
              ) : null}
            </View>
          )
        })}
      </View>
    </View>
  )
}
