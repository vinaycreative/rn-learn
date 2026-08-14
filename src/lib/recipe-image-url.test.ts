import { toRecipeImageUri } from "@/lib/recipe-image-url"

describe("toRecipeImageUri", () => {
  const mealImage = "https://www.themealdb.com/images/media/meals/meal.jpg"
  const categoryImage = "https://www.themealdb.com/images/category/beef.png"

  it("returns null for missing urls", () => {
    expect(toRecipeImageUri(null, "card")).toBeNull()
    expect(toRecipeImageUri("   ", "full")).toBeNull()
  })

  it("uses preview only for small meal thumbnails", () => {
    expect(toRecipeImageUri(mealImage, "preview")).toBe(`${mealImage}/preview`)
    expect(toRecipeImageUri(`${mealImage}/preview`, "preview")).toBe(`${mealImage}/preview`)
  })

  it("uses the base meal image for recipe cards", () => {
    expect(toRecipeImageUri(mealImage, "card")).toBe(mealImage)
    expect(toRecipeImageUri(`${mealImage}/preview`, "card")).toBe(mealImage)
    expect(toRecipeImageUri(`${mealImage}/large`, "card")).toBe(mealImage)
  })

  it("uses the base meal image for featured and detail views", () => {
    expect(toRecipeImageUri(`${mealImage}/preview`, "full")).toBe(mealImage)
    expect(toRecipeImageUri(`${mealImage}/large`, "full")).toBe(mealImage)
    expect(toRecipeImageUri(mealImage, "full")).toBe(mealImage)
  })

  it("leaves non-meal image urls unchanged", () => {
    expect(toRecipeImageUri(categoryImage, "preview")).toBe(categoryImage)
    expect(toRecipeImageUri(categoryImage, "card")).toBe(categoryImage)
    expect(toRecipeImageUri(categoryImage, "full")).toBe(categoryImage)
  })
})
