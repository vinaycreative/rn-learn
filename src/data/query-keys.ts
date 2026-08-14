export const recipeQueryKeys = {
  all: ["recipes"] as const,
  searches: () => [...recipeQueryKeys.all, "search"] as const,
  search: (name: string) => [...recipeQueryKeys.searches(), name] as const,
  details: () => [...recipeQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...recipeQueryKeys.details(), id] as const,
  random: () => [...recipeQueryKeys.all, "random"] as const,
  categories: () => [...recipeQueryKeys.all, "categories"] as const,
  areas: () => [...recipeQueryKeys.all, "areas"] as const,
  byCategory: (category: string) => [...recipeQueryKeys.all, "category", category] as const,
  byArea: (area: string) => [...recipeQueryKeys.all, "area", area] as const,
}

export const queryKeys = {
  recipes: recipeQueryKeys,
}
