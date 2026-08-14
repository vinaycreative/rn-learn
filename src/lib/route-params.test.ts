import { readRouteParam } from "@/lib/route-params"

describe("readRouteParam", () => {
  it("reads a string param", () => {
    expect(readRouteParam(" 52772 ")).toBe("52772")
  })

  it("uses the first array value from Expo Router", () => {
    expect(readRouteParam(["Chicken", "Dessert"])).toBe("Chicken")
  })

  it("returns an empty string when the param is missing", () => {
    expect(readRouteParam(undefined)).toBe("")
    expect(readRouteParam([])).toBe("")
  })
})
