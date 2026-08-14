import type { RecipeCardData } from "@/components/recipe-cards/types"

export function formatRecipeMeta(recipe: RecipeCardData): string {
  return [recipe.category, recipe.area].filter(Boolean).join(" · ")
}
