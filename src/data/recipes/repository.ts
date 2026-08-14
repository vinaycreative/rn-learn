import { DataError } from "@/data/errors"
import {
  mapAreaToRecipeArea,
  mapCategoryToRecipeCategory,
  mapMealSummaryToRecipeSummary,
  mapMealToRecipe,
  uniqueNamedItems,
} from "@/data/recipes/mappers"
import type { Recipe, RecipeArea, RecipeCategory, RecipeSummary } from "@/data/recipes/models"
import { parseApiPayload } from "@/data/recipes/parse"
import { themealdbClient, type ThemealdbRequestOptions } from "@/data/themealdb/client"
import {
  themealdbAreasResponseSchema,
  themealdbCategoriesResponseSchema,
  themealdbMealSummariesResponseSchema,
  themealdbMealsResponseSchema,
} from "@/data/themealdb/schemas"

function requireFirstRecipe(recipes: Recipe[] | null, error: DataError): Recipe {
  const recipe = recipes?.[0]

  if (!recipe) {
    throw error
  }

  return recipe
}

export const recipeRepository = {
  async searchByName(name: string, options?: ThemealdbRequestOptions): Promise<Recipe[]> {
    const query = name.trim()

    if (query.length === 0) {
      return []
    }

    const payload = await themealdbClient.searchMeals(query, options)
    const parsed = parseApiPayload(
      themealdbMealsResponseSchema,
      payload,
      "Search results were not in the expected format.",
    )

    if (parsed.meals === null) {
      return []
    }

    return parsed.meals.map(mapMealToRecipe)
  },

  async getById(id: string, options?: ThemealdbRequestOptions): Promise<Recipe> {
    const recipeId = id.trim()

    if (recipeId.length === 0) {
      throw new DataError("validation", "A recipe ID is required.")
    }

    const payload = await themealdbClient.lookupMeal(recipeId, options)
    const parsed = parseApiPayload(
      themealdbMealsResponseSchema,
      payload,
      "Recipe details were not in the expected format.",
    )
    const recipes = parsed.meals?.map(mapMealToRecipe) ?? null

    return requireFirstRecipe(recipes, new DataError("not_found", "That recipe could not be found."))
  },

  async getRandom(options?: ThemealdbRequestOptions): Promise<Recipe> {
    const payload = await themealdbClient.getRandomMeal(options)
    const parsed = parseApiPayload(
      themealdbMealsResponseSchema,
      payload,
      "The random recipe response was not in the expected format.",
    )
    const recipes = parsed.meals?.map(mapMealToRecipe) ?? null

    return requireFirstRecipe(recipes, new DataError("empty", "No random recipe is available right now."))
  },

  async getCategories(options?: ThemealdbRequestOptions): Promise<RecipeCategory[]> {
    const payload = await themealdbClient.getCategories(options)
    const parsed = parseApiPayload(
      themealdbCategoriesResponseSchema,
      payload,
      "Categories were not in the expected format.",
    )

    return parsed.categories.map(mapCategoryToRecipeCategory)
  },

  async getAreas(options?: ThemealdbRequestOptions): Promise<RecipeArea[]> {
    const payload = await themealdbClient.getAreas(options)
    const parsed = parseApiPayload(
      themealdbAreasResponseSchema,
      payload,
      "Areas were not in the expected format.",
    )

    if (parsed.meals === null) {
      return []
    }

    return uniqueNamedItems(parsed.meals.map(mapAreaToRecipeArea))
  },

  async getByCategory(category: string, options?: ThemealdbRequestOptions): Promise<RecipeSummary[]> {
    const selectedCategory = category.trim()

    if (selectedCategory.length === 0) {
      return []
    }

    const payload = await themealdbClient.filterByCategory(selectedCategory, options)
    const parsed = parseApiPayload(
      themealdbMealSummariesResponseSchema,
      payload,
      "Category recipes were not in the expected format.",
    )

    if (parsed.meals === null) {
      return []
    }

    return parsed.meals.map(mapMealSummaryToRecipeSummary)
  },

  async getByArea(area: string, options?: ThemealdbRequestOptions): Promise<RecipeSummary[]> {
    const selectedArea = area.trim()

    if (selectedArea.length === 0) {
      return []
    }

    const payload = await themealdbClient.filterByArea(selectedArea, options)
    const parsed = parseApiPayload(
      themealdbMealSummariesResponseSchema,
      payload,
      "Area recipes were not in the expected format.",
    )

    if (parsed.meals === null) {
      return []
    }

    return parsed.meals.map(mapMealSummaryToRecipeSummary)
  },
}
