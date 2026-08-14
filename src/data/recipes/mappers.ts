import { THEMEALDB_INGREDIENT_SLOT_COUNT } from "@/data/themealdb/config"
import type {
  ThemealdbArea,
  ThemealdbCategory,
  ThemealdbMeal,
  ThemealdbMealSummary,
} from "@/data/themealdb/schemas"
import type { Recipe, RecipeArea, RecipeCategory, RecipeIngredient, RecipeSummary } from "@/data/recipes/models"

export function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export function extractIngredients(meal: ThemealdbMeal): RecipeIngredient[] {
  const ingredients: RecipeIngredient[] = []

  for (let slot = 1; slot <= THEMEALDB_INGREDIENT_SLOT_COUNT; slot += 1) {
    const name = normalizeOptionalString(meal[`strIngredient${slot}`])

    if (!name) {
      continue
    }

    ingredients.push({
      name,
      measure: normalizeOptionalString(meal[`strMeasure${slot}`]) ?? "",
    })
  }

  return ingredients
}

export function parseRecipeTags(value: string | null | undefined): string[] {
  const tags = normalizeOptionalString(value)

  if (!tags) {
    return []
  }

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
}

export function mapMealToRecipe(meal: ThemealdbMeal): Recipe {
  return {
    id: meal.idMeal,
    name: meal.strMeal.trim(),
    category: normalizeOptionalString(meal.strCategory),
    area: normalizeOptionalString(meal.strArea),
    instructions: normalizeOptionalString(meal.strInstructions),
    imageUrl: normalizeOptionalString(meal.strMealThumb),
    tags: parseRecipeTags(meal.strTags),
    youtubeUrl: normalizeOptionalString(meal.strYoutube),
    sourceUrl: normalizeOptionalString(meal.strSource),
    ingredients: extractIngredients(meal),
  }
}

export function mapMealSummaryToRecipeSummary(meal: ThemealdbMealSummary): RecipeSummary {
  return {
    id: meal.idMeal,
    name: meal.strMeal.trim(),
    imageUrl: normalizeOptionalString(meal.strMealThumb),
  }
}

export function mapCategoryToRecipeCategory(category: ThemealdbCategory): RecipeCategory {
  return {
    id: category.idCategory,
    name: category.strCategory.trim(),
    imageUrl: normalizeOptionalString(category.strCategoryThumb),
    description: normalizeOptionalString(category.strCategoryDescription),
  }
}

export function mapAreaToRecipeArea(area: ThemealdbArea): RecipeArea {
  return {
    name: area.strArea.trim(),
  }
}
