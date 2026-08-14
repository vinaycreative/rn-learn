export type RecipeIngredient = {
  name: string
  measure: string
}

export type Recipe = {
  id: string
  name: string
  category: string | null
  area: string | null
  instructions: string | null
  imageUrl: string | null
  tags: string[]
  youtubeUrl: string | null
  sourceUrl: string | null
  ingredients: RecipeIngredient[]
}

export type RecipeSummary = {
  id: string
  name: string
  imageUrl: string | null
}

export type RecipeCategory = {
  id: string
  name: string
  imageUrl: string | null
  description: string | null
}

export type RecipeArea = {
  name: string
}
