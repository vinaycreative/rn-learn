import { normalizeFavoritesState, selectFavorites, useFavoritesStore } from "@/stores/favorites-store"

describe("normalizeFavoritesState", () => {
  it("treats malformed persisted data as empty", () => {
    expect(normalizeFavoritesState(null)).toEqual({ ids: [], byId: {} })
    expect(normalizeFavoritesState("bad")).toEqual({ ids: [], byId: {} })
  })

  it("keeps valid favorites and drops broken records", () => {
    const normalized = normalizeFavoritesState({
      ids: ["1", "missing", 12],
      byId: {
        "1": { id: "1", name: "Soup", imageUrl: null, category: "Starter", area: null, savedAt: 10 },
        broken: { id: "2", name: "Mismatch" },
      },
    })

    expect(normalized.ids).toEqual(["1"])
    expect(normalized.byId["1"]).toMatchObject({
      id: "1",
      name: "Soup",
      category: "Starter",
      savedAt: 10,
    })
    expect(normalized.byId.broken).toBeUndefined()
  })

  it("adds, toggles, and clears favorites", () => {
    useFavoritesStore.setState({ ids: [], byId: {} })

    const recipe = { id: "10", name: "Soup", imageUrl: null, category: "Starter", area: "British" }
    useFavoritesStore.getState().addFavorite(recipe)
    useFavoritesStore.getState().addFavorite(recipe)

    expect(selectFavorites(useFavoritesStore.getState())).toHaveLength(1)
    expect(useFavoritesStore.getState().isFavorite("10")).toBe(true)

    useFavoritesStore.getState().toggleFavorite(recipe)
    expect(useFavoritesStore.getState().isFavorite("10")).toBe(false)

    useFavoritesStore.getState().addFavorite(recipe)
    useFavoritesStore.getState().clearFavorites()
    expect(selectFavorites(useFavoritesStore.getState())).toEqual([])
  })
})
