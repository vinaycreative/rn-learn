import { type ReactNode } from "react"
import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"

/** Vertical space between stacked screen sections (title + content blocks). */
export const SECTION_GAP_CLASS = "mt-section"

/** Bottom padding for scroll/list header stacks above main content. */
export const LIST_HEADER_PADDING_CLASS = "pb-lg"

type SectionHeaderProps = {
  title: string
  actionLabel?: string
  onActionPress?: () => void
  actionAccessibilityLabel?: string
  actionTone?: "primary" | "error"
}

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
  actionAccessibilityLabel,
  actionTone = "primary",
}: SectionHeaderProps) {
  return (
    <View className="mb-xs flex-row items-center justify-between">
      <AppText variant="label" className="flex-1 pr-md">
        {title}
      </AppText>
      {actionLabel && onActionPress ? (
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={actionAccessibilityLabel ?? actionLabel}
          onPress={onActionPress}
          className="min-h-[44px] items-center justify-center px-sm"
        >
          <AppText variant="label" tone={actionTone}>
            {actionLabel}
          </AppText>
        </PressableScale>
      ) : null}
    </View>
  )
}

export function ScreenHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <View className="flex-row items-start justify-between">
      <View className="min-w-0 flex-1 pr-md">
        <AppText variant="subtitle">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" tone="muted" className="mt-xs">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {action}
    </View>
  )
}
