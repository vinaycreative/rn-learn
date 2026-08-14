import { useEffect } from "react"

import { isDataError, useRecipeById, type Recipe } from "@/data/recipes"

/**
 * Hook point for Recently Viewed. The details screen calls this when a recipe
 * is successfully opened so persistence can be added without restructuring UI.
 */
export function onRecipeOpened(_recipe: Recipe): void {}

/**
 * Hook point for Favorites. The details screen exposes this action so
 * persistence can be connected without changing the header layout.
 */
export function onFavoritePress(_recipe: Recipe): void {}

export function useRecipeDetails(recipeId: string) {
  const query = useRecipeById(recipeId)
  const recipe = query.data
  const isMissingId = recipeId.length === 0
  const isNotFound = query.isError && isDataError(query.error) && query.error.code === "not_found"

  useEffect(() => {
    if (!recipe) {
      return
    }

    onRecipeOpened(recipe)
  }, [recipe])

  return {
    recipe,
    isLoading: !isMissingId && query.isPending,
    isMissing: isMissingId || isNotFound || (query.isSuccess && !recipe),
    isError: query.isError && !isNotFound,
    error: query.error,
    refetch: query.refetch,
    isFavorite: false,
    onFavoritePress: recipe ? () => onFavoritePress(recipe) : undefined,
  }
}
