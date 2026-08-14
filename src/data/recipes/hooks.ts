import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/data/query-keys"
import { recipeRepository } from "@/data/recipes/repository"

const CATALOG_STALE_TIME_MS = 30 * 60_000

export function useSearchRecipes(name: string) {
  const query = name.trim()

  return useQuery({
    queryKey: queryKeys.recipes.search(query),
    queryFn: ({ signal }) => recipeRepository.searchByName(query, { signal }),
    enabled: query.length > 0,
  })
}

export function useRecipeById(id: string) {
  const recipeId = id.trim()

  return useQuery({
    queryKey: queryKeys.recipes.detail(recipeId),
    queryFn: ({ signal }) => recipeRepository.getById(recipeId, { signal }),
    enabled: recipeId.length > 0,
  })
}

export function useRandomRecipe(enabled = true) {
  return useQuery({
    queryKey: queryKeys.recipes.random(),
    queryFn: ({ signal }) => recipeRepository.getRandom({ signal }),
    enabled,
    staleTime: 0,
  })
}

export function useRecipeCategories() {
  return useQuery({
    queryKey: queryKeys.recipes.categories(),
    queryFn: ({ signal }) => recipeRepository.getCategories({ signal }),
    staleTime: CATALOG_STALE_TIME_MS,
  })
}

export function useRecipeAreas() {
  return useQuery({
    queryKey: queryKeys.recipes.areas(),
    queryFn: ({ signal }) => recipeRepository.getAreas({ signal }),
    staleTime: CATALOG_STALE_TIME_MS,
  })
}

export function useRecipesByCategory(category: string) {
  const selectedCategory = category.trim()

  return useQuery({
    queryKey: queryKeys.recipes.byCategory(selectedCategory),
    queryFn: ({ signal }) => recipeRepository.getByCategory(selectedCategory, { signal }),
    enabled: selectedCategory.length > 0,
  })
}

export function useRecipesByArea(area: string) {
  const selectedArea = area.trim()

  return useQuery({
    queryKey: queryKeys.recipes.byArea(selectedArea),
    queryFn: ({ signal }) => recipeRepository.getByArea(selectedArea, { signal }),
    enabled: selectedArea.length > 0,
  })
}
