import { DataError } from "@/data/errors"
import { parseApiPayload } from "@/data/recipes/parse"
import { themealdbMealsResponseSchema } from "@/data/themealdb/schemas"

describe("parseApiPayload", () => {
  it("returns validated data", () => {
    const payload = { meals: null }
    expect(parseApiPayload(themealdbMealsResponseSchema, payload, "invalid")).toEqual(payload)
  })

  it("throws a validation DataError for malformed payloads", () => {
    expect(() => parseApiPayload(themealdbMealsResponseSchema, { meals: "nope" }, "Search failed.")).toThrow(
      DataError,
    )

    try {
      parseApiPayload(themealdbMealsResponseSchema, { meals: "nope" }, "Search failed.")
    } catch (error) {
      expect(error).toBeInstanceOf(DataError)
      expect((error as DataError).code).toBe("validation")
      expect((error as DataError).message).toBe("Search failed.")
    }
  })
})
