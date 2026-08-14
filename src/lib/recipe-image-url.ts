export type RecipeImageVariant = "preview" | "card" | "full"

const MEAL_IMAGE_PATH = /\/images\/media\/meals\//i
const MEAL_IMAGE_SUFFIX = /\/(preview|large)\/?$/i

function normalizeMealImageBase(url: string): string {
  return url.replace(MEAL_IMAGE_SUFFIX, "")
}

function isMealImageUrl(url: string): boolean {
  return MEAL_IMAGE_PATH.test(url)
}

/**
 * Resolves the best TheMealDB image URL for a given display size.
 *
 * Meal images are available at:
 * - base URL — 700×700 (highest quality; used for cards and detail views)
 * - /large — 500×500 (legacy intermediate size; not used for cards)
 * - /preview — 150×150 (small icons only; never upscale for cards)
 *
 * Category and other non-meal URLs are returned unchanged.
 */
export function toRecipeImageUri(url: string | null | undefined, variant: RecipeImageVariant): string | null {
  const normalized = url?.trim() ?? ""

  if (normalized.length === 0) {
    return null
  }

  if (!isMealImageUrl(normalized)) {
    return normalized
  }

  const base = normalizeMealImageBase(normalized)

  switch (variant) {
    case "preview":
      return `${base}/preview`
    case "card":
    case "full":
      return base
  }
}
