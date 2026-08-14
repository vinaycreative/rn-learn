import { useRouter } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react"

import {
  useRecipeAreas,
  useRecipeCategories,
  useRecipesByArea,
  useRecipesByCategory,
  useSearchRecipes,
} from "@/data/recipes"

const SEARCH_DEBOUNCE_MS = 350

export type ExploreMode = "browse" | "search" | "category" | "area"

type UseExploreOptions = {
  category: string
  area: string
}

export function useExplore({ category, area }: UseExploreOptions) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const trimmedInput = searchInput.trim()

  useEffect(() => {
    if (trimmedInput.length === 0) {
      setDebouncedQuery("")
      return
    }

    const timeoutId = setTimeout(() => {
      setDebouncedQuery(trimmedInput)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [trimmedInput])

  const isSearchMode = trimmedInput.length > 0
  const selectedCategory = isSearchMode ? "" : category.trim()
  const selectedArea = isSearchMode || selectedCategory.length > 0 ? "" : area.trim()

  const categoriesQuery = useRecipeCategories()
  const areasQuery = useRecipeAreas()
  const searchQuery = useSearchRecipes(debouncedQuery)
  const categoryRecipesQuery = useRecipesByCategory(selectedCategory)
  const areaRecipesQuery = useRecipesByArea(selectedArea)

  const mode: ExploreMode = isSearchMode
    ? "search"
    : selectedCategory.length > 0
      ? "category"
      : selectedArea.length > 0
        ? "area"
        : "browse"

  const resultsQuery = useMemo(() => {
    if (mode === "search") {
      return searchQuery
    }

    if (mode === "category") {
      return categoryRecipesQuery
    }

    if (mode === "area") {
      return areaRecipesQuery
    }

    return null
  }, [areaRecipesQuery, categoryRecipesQuery, mode, searchQuery])

  const isSearchPending = isSearchMode && trimmedInput !== debouncedQuery

  const setBrowseParams = useCallback(
    (nextCategory: string, nextArea: string) => {
      router.setParams({
        category: nextCategory,
        area: nextArea,
      })
    },
    [router],
  )

  const selectCategory = useCallback(
    (name: string) => {
      const nextCategory = !isSearchMode && selectedCategory === name ? "" : name
      setSearchInput("")
      setDebouncedQuery("")
      setBrowseParams(nextCategory, "")
    },
    [isSearchMode, selectedCategory, setBrowseParams],
  )

  const selectArea = useCallback(
    (name: string) => {
      const nextArea = !isSearchMode && selectedArea === name ? "" : name
      setSearchInput("")
      setDebouncedQuery("")
      setBrowseParams("", nextArea)
    },
    [isSearchMode, selectedArea, setBrowseParams],
  )

  const clearBrowse = useCallback(() => {
    setBrowseParams("", "")
  }, [setBrowseParams])

  const submitSearch = useCallback(() => {
    setDebouncedQuery(trimmedInput)
  }, [trimmedInput])

  const clearSearch = useCallback(() => {
    setSearchInput("")
    setDebouncedQuery("")
  }, [])

  return {
    searchInput,
    setSearchInput,
    submitSearch,
    clearSearch,
    mode,
    selectedCategory,
    selectedArea,
    selectCategory,
    selectArea,
    clearBrowse,
    categoriesQuery,
    areasQuery,
    resultsQuery,
    isSearchPending,
  }
}
