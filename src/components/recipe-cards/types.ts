import type { RecipeSummary } from "@/data/recipes"

export type RecipeCardData = Pick<RecipeSummary, "id" | "name" | "imageUrl"> & {
  category?: string | null
  area?: string | null
}
