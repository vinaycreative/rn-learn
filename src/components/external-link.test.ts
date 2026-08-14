import { isSafeExternalUrl } from "@/components/external-link"

describe("isSafeExternalUrl", () => {
  it("allows http and https links", () => {
    expect(isSafeExternalUrl("https://www.themealdb.com/meal/52772")).toBe(true)
    expect(isSafeExternalUrl("http://example.com")).toBe(true)
  })

  it("rejects unsafe or invalid urls", () => {
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false)
    expect(isSafeExternalUrl("not-a-url")).toBe(false)
  })
})
