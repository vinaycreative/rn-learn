import { DataError } from "@/data/errors"
import { recipeRepository } from "@/data/recipes/repository"

describe("recipeRepository", () => {
  it("returns an empty list for a blank search without calling the API", async () => {
    await expect(recipeRepository.searchByName("   ")).resolves.toEqual([])
  })

  it("rejects a blank recipe id as a validation error", async () => {
    await expect(recipeRepository.getById("")).rejects.toMatchObject({
      name: "DataError",
      code: "validation",
    } satisfies Partial<DataError>)
  })
})
