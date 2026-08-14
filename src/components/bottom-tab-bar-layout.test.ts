import {
  BOTTOM_TAB_BAR_CONTENT_GAP,
  BOTTOM_TAB_BAR_HEIGHT,
  BOTTOM_TAB_BAR_MIN_BOTTOM_INSET,
  getBottomTabBarBottomOffset,
  getBottomTabBarContentPadding,
} from "@/components/bottom-tab-bar-layout"

describe("bottom tab bar layout", () => {
  it("uses the minimum bottom inset when the device inset is smaller", () => {
    expect(getBottomTabBarBottomOffset(0)).toBe(BOTTOM_TAB_BAR_MIN_BOTTOM_INSET)
  })

  it("uses the device bottom inset when it is larger than the minimum", () => {
    expect(getBottomTabBarBottomOffset(34)).toBe(34)
  })

  it("reserves space for the floating bar, safe area, and content gap", () => {
    expect(getBottomTabBarContentPadding(34)).toBe(
      BOTTOM_TAB_BAR_HEIGHT + 34 + BOTTOM_TAB_BAR_CONTENT_GAP,
    )
  })
})
