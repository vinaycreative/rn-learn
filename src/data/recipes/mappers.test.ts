import { extractIngredients, mapMealToRecipe, parseRecipeTags } from "@/data/recipes/mappers"
import type { ThemealdbMeal } from "@/data/themealdb/schemas"

function createMeal(overrides: Partial<ThemealdbMeal> = {}): ThemealdbMeal {
  return {
    idMeal: "52772",
    strMeal: " Teriyaki Chicken Casserole ",
    strCategory: "Chicken",
    strArea: "Japanese",
    strInstructions: "Preheat oven.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    strTags: "Meat,Casserole",
    strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    strSource: "https://example.com/recipe",
    strIngredient1: "soy sauce",
    strMeasure1: "3/4 cup",
    strIngredient2: "  ",
    strMeasure2: "1 cup",
    strIngredient3: "chicken",
    strMeasure3: null,
    ...overrides,
  }
}

describe("recipe mappers", () => {
  it("maps a meal onto the application recipe model", () => {
    const recipe = mapMealToRecipe(createMeal())

    expect(recipe).toMatchObject({
      id: "52772",
      name: "Teriyaki Chicken Casserole",
      category: "Chicken",
      area: "Japanese",
      imageUrl: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      tags: ["Meat", "Casserole"],
    })
    expect(recipe.ingredients).toEqual([
      { name: "soy sauce", measure: "3/4 cup" },
      { name: "chicken", measure: "" },
    ])
  })

  it("omits blank ingredient names", () => {
    expect(extractIngredients(createMeal({ strIngredient1: "   ", strIngredient3: undefined }))).toEqual([])
  })

  it("parses comma-separated tags and ignores empty values", () => {
    expect(parseRecipeTags("Dinner, ,  Easy")).toEqual(["Dinner", "Easy"])
    expect(parseRecipeTags("   ")).toEqual([])
    expect(parseRecipeTags(null)).toEqual([])
  })
})
