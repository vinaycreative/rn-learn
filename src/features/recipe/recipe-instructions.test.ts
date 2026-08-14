import { splitInstructionBlocks } from "@/features/recipe/recipe-instructions"

describe("splitInstructionBlocks", () => {
  it("returns an empty list when instructions are missing", () => {
    expect(splitInstructionBlocks(null)).toEqual([])
    expect(splitInstructionBlocks("   ")).toEqual([])
  })

  it("splits paragraph-separated instructions", () => {
    expect(splitInstructionBlocks("Preheat the oven.\n\nBake for 20 minutes.")).toEqual([
      "Preheat the oven.",
      "Bake for 20 minutes.",
    ])
  })

  it("splits numbered steps", () => {
    expect(splitInstructionBlocks("1. Mix the sauce\n2. Add chicken")).toEqual(["Mix the sauce", "Add chicken"])
  })
})
