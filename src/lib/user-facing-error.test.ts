import { DataError } from "@/data/errors"
import { getUserFacingErrorMessage } from "@/lib/user-facing-error"

describe("getUserFacingErrorMessage", () => {
  it("uses the normalized DataError message", () => {
    expect(getUserFacingErrorMessage(new DataError("network", "Check your connection."))).toBe(
      "Check your connection.",
    )
  })

  it("hides unknown implementation errors", () => {
    expect(getUserFacingErrorMessage(new Error("ECONNRESET"))).toBe("Something went wrong. Please try again.")
  })
})
