import { toRecipeImageUri } from "@/lib/recipe-image-url"

describe("toRecipeImageUri", () => {
  const source = "https://www.themealdb.com/images/media/meals/meal.jpg"

  it("returns null for missing urls", () => {
    expect(toRecipeImageUri(null, "thumb")).toBeNull()
    expect(toRecipeImageUri("   ", "full")).toBeNull()
  })

  it("appends TheMealDB preview for list thumbnails", () => {
    expect(toRecipeImageUri(source, "thumb")).toBe(`${source}/preview`)
    expect(toRecipeImageUri(`${source}/preview`, "thumb")).toBe(`${source}/preview`)
  })

  it("uses the full image for detail and featured views", () => {
    expect(toRecipeImageUri(`${source}/preview`, "full")).toBe(source)
    expect(toRecipeImageUri(source, "full")).toBe(source)
  })
})
