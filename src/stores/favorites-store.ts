import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { zustandAsyncStorage } from "@/lib/persist-storage"
import { storageKeys } from "@/lib/storage-keys"
import {
  normalizeSavedRecipeSummary,
  toSavedRecipeSummary,
  type SavedRecipeInput,
  type SavedRecipeSummary,
} from "@/stores/saved-recipe"

export type FavoriteRecipe = SavedRecipeSummary & {
  savedAt: number
}

type FavoritesState = {
  ids: string[]
  byId: Record<string, FavoriteRecipe>
  isHydrated: boolean
  addFavorite: (recipe: SavedRecipeInput) => void
  removeFavorite: (recipeId: string) => void
  toggleFavorite: (recipe: SavedRecipeInput) => void
  isFavorite: (recipeId: string) => boolean
  getFavorites: () => FavoriteRecipe[]
  clearFavorites: () => void
}

type PersistedFavoritesState = Pick<FavoritesState, "ids" | "byId">

function createFavorite(recipe: SavedRecipeInput, savedAt = Date.now()): FavoriteRecipe {
  return {
    ...toSavedRecipeSummary(recipe),
    savedAt,
  }
}

function normalizeFavoritesState(value: unknown): PersistedFavoritesState {
  if (!value || typeof value !== "object") {
    return { ids: [], byId: {} }
  }

  const candidate = value as Partial<PersistedFavoritesState>
  const byId: Record<string, FavoriteRecipe> = {}

  if (candidate.byId && typeof candidate.byId === "object") {
    for (const [id, item] of Object.entries(candidate.byId)) {
      const summary = normalizeSavedRecipeSummary(item)

      if (!summary || summary.id !== id) {
        continue
      }

      const savedAt =
        item && typeof item === "object" && "savedAt" in item && typeof item.savedAt === "number"
          ? item.savedAt
          : Date.now()

      byId[id] = { ...summary, savedAt }
    }
  }

  const ids = Array.isArray(candidate.ids)
    ? candidate.ids.filter((id): id is string => typeof id === "string" && id in byId)
    : Object.keys(byId)

  for (const id of Object.keys(byId)) {
    if (!ids.includes(id)) {
      ids.push(id)
    }
  }

  return { ids, byId }
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      byId: {},
      isHydrated: false,
      addFavorite: (recipe) => {
        const recipeId = recipe.id

        if (!recipeId || get().byId[recipeId]) {
          return
        }

        const favorite = createFavorite(recipe)

        set((state) => ({
          ids: [recipeId, ...state.ids],
          byId: { ...state.byId, [recipeId]: favorite },
        }))
      },
      removeFavorite: (recipeId) => {
        if (!get().byId[recipeId]) {
          return
        }

        set((state) => {
          const { [recipeId]: _removed, ...byId } = state.byId

          return {
            ids: state.ids.filter((id) => id !== recipeId),
            byId,
          }
        })
      },
      toggleFavorite: (recipe) => {
        if (get().byId[recipe.id]) {
          get().removeFavorite(recipe.id)
          return
        }

        get().addFavorite(recipe)
      },
      isFavorite: (recipeId) => Boolean(get().byId[recipeId]),
      getFavorites: () => {
        const { ids, byId } = get()
        return ids.flatMap((id) => (byId[id] ? [byId[id]] : []))
      },
      clearFavorites: () => {
        set({ ids: [], byId: {} })
      },
    }),
    {
      name: storageKeys.favorites,
      storage: createJSONStorage(() => zustandAsyncStorage),
      partialize: (state) => ({
        ids: state.ids,
        byId: state.byId,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...normalizeFavoritesState(persisted),
      }),
      onRehydrateStorage: () => () => {
        useFavoritesStore.setState({ isHydrated: true })
      },
    },
  ),
)

function markFavoritesHydrated() {
  useFavoritesStore.setState({ isHydrated: true })
}

if (useFavoritesStore.persist.hasHydrated()) {
  markFavoritesHydrated()
}

useFavoritesStore.persist.onFinishHydration(markFavoritesHydrated)

export function selectFavorites(state: FavoritesState): FavoriteRecipe[] {
  return state.ids.flatMap((id) => (state.byId[id] ? [state.byId[id]] : []))
}

export function selectIsFavorite(recipeId: string) {
  return (state: FavoritesState) => Boolean(state.byId[recipeId])
}
