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

export const MAX_RECENTLY_VIEWED = 20

export type RecentlyViewedRecipe = SavedRecipeSummary & {
  viewedAt: number
}

type RecentlyViewedState = {
  ids: string[]
  byId: Record<string, RecentlyViewedRecipe>
  isHydrated: boolean
  recordView: (recipe: SavedRecipeInput) => void
  clearHistory: () => void
}

type PersistedRecentlyViewedState = Pick<RecentlyViewedState, "ids" | "byId">

function createRecentlyViewed(recipe: SavedRecipeInput, viewedAt = Date.now()): RecentlyViewedRecipe {
  return {
    ...toSavedRecipeSummary(recipe),
    viewedAt,
  }
}

function normalizeRecentlyViewedState(value: unknown): PersistedRecentlyViewedState {
  if (!value || typeof value !== "object") {
    return { ids: [], byId: {} }
  }

  const candidate = value as Partial<PersistedRecentlyViewedState>
  const byId: Record<string, RecentlyViewedRecipe> = {}

  if (candidate.byId && typeof candidate.byId === "object") {
    for (const [id, item] of Object.entries(candidate.byId)) {
      const summary = normalizeSavedRecipeSummary(item)

      if (!summary || summary.id !== id) {
        continue
      }

      const viewedAt =
        item && typeof item === "object" && "viewedAt" in item && typeof item.viewedAt === "number"
          ? item.viewedAt
          : Date.now()

      byId[id] = { ...summary, viewedAt }
    }
  }

  const ids = (
    Array.isArray(candidate.ids)
      ? candidate.ids.filter((id): id is string => typeof id === "string" && id in byId)
      : Object.keys(byId)
  ).slice(0, MAX_RECENTLY_VIEWED)

  const prunedById = Object.fromEntries(ids.map((id) => [id, byId[id]])) as Record<
    string,
    RecentlyViewedRecipe
  >

  return { ids, byId: prunedById }
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      ids: [],
      byId: {},
      isHydrated: false,
      recordView: (recipe) => {
        const recipeId = recipe.id

        if (!recipeId || !recipe.name) {
          return
        }

        const viewed = createRecentlyViewed(recipe)
        const nextIds = [recipeId, ...get().ids.filter((id) => id !== recipeId)].slice(
          0,
          MAX_RECENTLY_VIEWED,
        )
        const nextById: Record<string, RecentlyViewedRecipe> = { [recipeId]: viewed }

        for (const id of nextIds) {
          if (id === recipeId) {
            continue
          }

          const existing = get().byId[id]

          if (existing) {
            nextById[id] = existing
          }
        }

        set({ ids: nextIds, byId: nextById })
      },
      clearHistory: () => {
        set({ ids: [], byId: {} })
      },
    }),
    {
      name: storageKeys.recentlyViewed,
      storage: createJSONStorage(() => zustandAsyncStorage),
      partialize: (state) => ({
        ids: state.ids,
        byId: state.byId,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...normalizeRecentlyViewedState(persisted),
      }),
      onRehydrateStorage: () => () => {
        useRecentlyViewedStore.setState({ isHydrated: true })
      },
    },
  ),
)

function markRecentlyViewedHydrated() {
  useRecentlyViewedStore.setState({ isHydrated: true })
}

if (useRecentlyViewedStore.persist.hasHydrated()) {
  markRecentlyViewedHydrated()
}

useRecentlyViewedStore.persist.onFinishHydration(markRecentlyViewedHydrated)

export function selectRecentlyViewed(state: RecentlyViewedState): RecentlyViewedRecipe[] {
  return state.ids.flatMap((id) => (state.byId[id] ? [state.byId[id]] : []))
}
