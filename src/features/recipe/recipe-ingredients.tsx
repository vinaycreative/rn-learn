import { AppText } from "@/components/ui/app-text"
import type { RecipeIngredient } from "@/data/recipes"
import { IngredientRow } from "@/features/recipe/ingredient-row"
import { View } from "react-native"

type RecipeIngredientsProps = {
  ingredients: RecipeIngredient[]
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  const visibleIngredients = ingredients.filter((ingredient) => ingredient.name.trim().length > 0)

  if (visibleIngredients.length === 0) {
    return (
      <View className="px-xl pt-md">
        <AppText variant="body" tone="muted">
          No ingredients listed for this recipe.
        </AppText>
      </View>
    )
  }

  return (
    <View className="px-xl pt-md">
      {visibleIngredients.map((ingredient, index) => (
        <IngredientRow
          key={`${ingredient.name}-${index}`}
          measure={ingredient.measure}
          name={ingredient.name}
        />
      ))}
    </View>
  )
}
