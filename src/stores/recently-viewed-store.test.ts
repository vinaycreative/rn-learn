import {
  MAX_RECENTLY_VIEWED,
  normalizeRecentlyViewedState,
  selectRecentlyViewed,
  useRecentlyViewedStore,
} from "@/stores/recently-viewed-store"

describe("normalizeRecentlyViewedState", () => {
  it("treats malformed persisted data as empty", () => {
    expect(normalizeRecentlyViewedState(undefined)).toEqual({ ids: [], byId: {} })
  })

  it("caps history and drops records that are not in the id list", () => {
    const ids = Array.from({ length: MAX_RECENTLY_VIEWED + 5 }, (_, index) => String(index + 1))
    const byId = Object.fromEntries(
      ids.map((id) => [id, { id, name: `Recipe ${id}`, imageUrl: null, viewedAt: Number(id) }]),
    )

    const normalized = normalizeRecentlyViewedState({ ids, byId })

    expect(normalized.ids).toHaveLength(MAX_RECENTLY_VIEWED)
    expect(normalized.ids[0]).toBe("1")
    expect(Object.keys(normalized.byId)).toHaveLength(MAX_RECENTLY_VIEWED)
  })

  it("records unique views most-recent first and caps history", () => {
    useRecentlyViewedStore.setState({ ids: [], byId: {} })

    useRecentlyViewedStore.getState().recordView({ id: "1", name: "Soup", imageUrl: null })
    useRecentlyViewedStore.getState().recordView({ id: "2", name: "Stew", imageUrl: null })
    useRecentlyViewedStore.getState().recordView({ id: "1", name: "Soup", imageUrl: null })

    expect(selectRecentlyViewed(useRecentlyViewedStore.getState()).map((recipe) => recipe.id)).toEqual([
      "1",
      "2",
    ])

    for (let index = 3; index <= MAX_RECENTLY_VIEWED + 2; index += 1) {
      useRecentlyViewedStore.getState().recordView({
        id: String(index),
        name: `Recipe ${index}`,
        imageUrl: null,
      })
    }

    const history = selectRecentlyViewed(useRecentlyViewedStore.getState())
    expect(history).toHaveLength(MAX_RECENTLY_VIEWED)
    expect(history.some((recipe) => recipe.id === "1")).toBe(false)

    useRecentlyViewedStore.getState().clearHistory()
    expect(selectRecentlyViewed(useRecentlyViewedStore.getState())).toEqual([])
  })
})
