import { getExploreMode } from "@/features/explore/use-explore"

describe("getExploreMode", () => {
  it("prefers search over category and area filters", () => {
    expect(getExploreMode(" pasta ", "Chicken", "Italian")).toBe("search")
  })

  it("uses category browsing when no search is active", () => {
    expect(getExploreMode("", "Dessert", "French")).toBe("category")
  })

  it("uses area browsing when only a cuisine is selected", () => {
    expect(getExploreMode("  ", "", "Mexican")).toBe("area")
  })

  it("returns browse when nothing is selected", () => {
    expect(getExploreMode("", "", "")).toBe("browse")
  })
})
