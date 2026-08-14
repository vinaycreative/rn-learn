import { useMemo } from "react"

import { useRandomRecipe, useRecipeCategories, useRecipesByCategory } from "@/data/recipes"

const DISCOVERY_CATEGORY_PREFERENCE = ["Chicken", "Dessert", "Seafood"] as const

export function useHomeDiscovery() {
  const featuredQuery = useRandomRecipe()
  const categoriesQuery = useRecipeCategories()

  const discoveryCategory = useMemo(() => {
    const categories = categoriesQuery.data

    if (!categories?.length) {
      return ""
    }

    const preferred = DISCOVERY_CATEGORY_PREFERENCE.find((name) =>
      categories.some((category) => category.name === name),
    )

    return preferred ?? categories[0].name
  }, [categoriesQuery.data])

  const popularQuery = useRecipesByCategory(discoveryCategory)

  return {
    featuredQuery,
    categoriesQuery,
    popularQuery,
    discoveryCategory,
  }
}
