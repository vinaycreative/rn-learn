import { useEffect } from "react"

import { isDataError, useRecipeById } from "@/data/recipes"
import { selectIsFavorite, useFavoritesStore } from "@/stores/favorites-store"
import { useRecentlyViewedStore } from "@/stores/recently-viewed-store"
import { toSavedRecipeSummary } from "@/stores/saved-recipe"

export function useRecipeDetails(recipeId: string) {
  const query = useRecipeById(recipeId)
  const recipe = query.data
  const isMissingId = recipeId.length === 0
  const isNotFound = query.isError && isDataError(query.error) && query.error.code === "not_found"
  const isFavoriteReady = useFavoritesStore((state) => state.isHydrated)
  const isFavorite = useFavoritesStore(selectIsFavorite(recipeId))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  useEffect(() => {
    if (!recipe) {
      return
    }

    useRecentlyViewedStore.getState().recordView(toSavedRecipeSummary(recipe))
  }, [recipe])

  return {
    recipe,
    isLoading: !isMissingId && query.isPending,
    isMissing: isMissingId || isNotFound || (query.isSuccess && !recipe),
    isError: query.isError && !isNotFound,
    error: query.error,
    refetch: query.refetch,
    isFavorite: isFavoriteReady && isFavorite,
    isFavoriteReady,
    onFavoritePress:
      recipe && isFavoriteReady ? () => toggleFavorite(toSavedRecipeSummary(recipe)) : undefined,
  }
}
