import { formatStepNumber } from "@/features/recipe/instruction-step"

describe("formatStepNumber", () => {
  it("zero-pads single-digit step numbers", () => {
    expect(formatStepNumber(1)).toBe("01")
    expect(formatStepNumber(9)).toBe("09")
  })

  it("leaves multi-digit step numbers unchanged", () => {
    expect(formatStepNumber(10)).toBe("10")
    expect(formatStepNumber(12)).toBe("12")
  })
})
