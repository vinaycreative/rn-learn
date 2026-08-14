import { DataError, isAbortError } from "@/data/errors"
import { THEMEALDB_BASE_URL } from "@/data/themealdb/config"

export type ThemealdbRequestOptions = {
  signal?: AbortSignal
}

async function getJson(
  path: string,
  params: Record<string, string> = {},
  options?: ThemealdbRequestOptions,
): Promise<unknown> {
  const url = new URL(path, THEMEALDB_BASE_URL)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  let response: Response

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: options?.signal,
    })
  } catch (error) {
    if (isAbortError(error)) {
      throw error
    }

    throw new DataError(
      "network",
      "Unable to reach the recipe service. Check your connection and try again.",
      error,
    )
  }

  if (!response.ok) {
    throw new DataError("api", "The recipe service is unavailable right now. Please try again.")
  }

  try {
    return await response.json()
  } catch (error) {
    throw new DataError("api", "The recipe service returned a response that could not be parsed.", error)
  }
}

export const themealdbClient = {
  searchMeals(name: string, options?: ThemealdbRequestOptions) {
    return getJson("search.php", { s: name }, options)
  },

  lookupMeal(id: string, options?: ThemealdbRequestOptions) {
    return getJson("lookup.php", { i: id }, options)
  },

  getRandomMeal(options?: ThemealdbRequestOptions) {
    return getJson("random.php", {}, options)
  },

  getCategories(options?: ThemealdbRequestOptions) {
    return getJson("categories.php", {}, options)
  },

  getAreas(options?: ThemealdbRequestOptions) {
    return getJson("list.php", { a: "list" }, options)
  },

  filterByCategory(category: string, options?: ThemealdbRequestOptions) {
    return getJson("filter.php", { c: category }, options)
  },

  filterByArea(area: string, options?: ThemealdbRequestOptions) {
    return getJson("filter.php", { a: area }, options)
  },
}
