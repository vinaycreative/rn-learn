export type RecipeImageVariant = "thumb" | "full"

export function toRecipeImageUri(url: string | null | undefined, variant: RecipeImageVariant): string | null {
  const normalized = url?.trim() ?? ""

  if (normalized.length === 0) {
    return null
  }

  const withoutPreview = normalized.replace(/\/preview\/?$/, "")

  if (variant === "full") {
    return withoutPreview
  }

  return `${withoutPreview}/preview`
}
