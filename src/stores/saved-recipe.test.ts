import { normalizeSavedRecipeSummary, toSavedRecipeSummary } from "@/stores/saved-recipe"

describe("saved recipe summaries", () => {
  it("normalizes optional fields for persistence", () => {
    expect(
      toSavedRecipeSummary({
        id: "1",
        name: "Soup",
        imageUrl: null,
      }),
    ).toEqual({
      id: "1",
      name: "Soup",
      imageUrl: null,
      category: null,
      area: null,
    })
  })

  it("discards malformed persisted summaries", () => {
    expect(normalizeSavedRecipeSummary(null)).toBeNull()
    expect(normalizeSavedRecipeSummary({ id: "", name: "Soup" })).toBeNull()
    expect(normalizeSavedRecipeSummary({ id: "1", name: "Soup", imageUrl: "https://img.test/meal.jpg" })).toEqual({
      id: "1",
      name: "Soup",
      imageUrl: "https://img.test/meal.jpg",
      category: null,
      area: null,
    })
  })
})
