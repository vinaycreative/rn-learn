import { Appearance } from "react-native"

import { applyThemePreference } from "@/lib/apply-theme-preference"

describe("applyThemePreference", () => {
  it("does not throw when Appearance.setColorScheme is unavailable", () => {
    const appearance = Appearance as { setColorScheme?: typeof Appearance.setColorScheme }
    const original = appearance.setColorScheme

    appearance.setColorScheme = undefined

    expect(() => applyThemePreference("dark")).not.toThrow()

    appearance.setColorScheme = original
  })
})
