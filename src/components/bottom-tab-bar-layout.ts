import { componentHeight, spacing } from "@/constants/theme"

export const BOTTOM_TAB_BAR_HEIGHT = componentHeight.tabBar
export const BOTTOM_TAB_BAR_CONTENT_GAP = spacing.md
export const BOTTOM_TAB_BAR_MIN_BOTTOM_INSET = spacing.md
export const BOTTOM_TAB_BAR_HORIZONTAL_INSET = spacing.lg

export function getBottomTabBarBottomOffset(bottomInset: number) {
  return Math.max(bottomInset, BOTTOM_TAB_BAR_MIN_BOTTOM_INSET)
}

export function getBottomTabBarContentPadding(bottomInset: number) {
  return (
    BOTTOM_TAB_BAR_HEIGHT + getBottomTabBarBottomOffset(bottomInset) + BOTTOM_TAB_BAR_CONTENT_GAP
  )
}
