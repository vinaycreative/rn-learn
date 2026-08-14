import { z } from "zod"

export type SavedRecipeSummary = {
  id: string
  name: string
  imageUrl: string | null
  category: string | null
  area: string | null
}

export type SavedRecipeInput = {
  id: string
  name: string
  imageUrl: string | null
  category?: string | null
  area?: string | null
}

export const savedRecipeSummarySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  area: z.string().nullable().optional(),
})

export function toSavedRecipeSummary(recipe: SavedRecipeInput): SavedRecipeSummary {
  return {
    id: recipe.id,
    name: recipe.name,
    imageUrl: recipe.imageUrl,
    category: recipe.category ?? null,
    area: recipe.area ?? null,
  }
}

export function normalizeSavedRecipeSummary(value: unknown): SavedRecipeSummary | null {
  const parsed = savedRecipeSummarySchema.safeParse(value)

  if (!parsed.success) {
    return null
  }

  return {
    id: parsed.data.id,
    name: parsed.data.name,
    imageUrl: parsed.data.imageUrl ?? null,
    category: parsed.data.category ?? null,
    area: parsed.data.area ?? null,
  }
}
