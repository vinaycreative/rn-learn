import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"
import { motion } from "@/lib/motion"
import Animated from "react-native-reanimated"

type TagChipProps = {
  label: string
}

export function TagChip({ label }: TagChipProps) {
  return (
    <View className="min-h-[36px] items-center justify-center rounded-full border border-transparent bg-surface-elevated px-lg dark:bg-surface-elevated-dark">
      <AppText variant="label">{label}</AppText>
    </View>
  )
}

type ChipProps = {
  label: string
  selected?: boolean
  onPress: () => void
  accessibilityLabel?: string
}

export function Chip({ label, selected = false, onPress, accessibilityLabel }: ChipProps) {
  return (
    <Animated.View layout={motion.layout}>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ selected }}
        onPress={onPress}
        className={`min-h-[44px] items-center justify-center rounded-full border px-lg ${
          selected
            ? "border-primary bg-primary-soft dark:border-primary-dark dark:bg-primary-soft-dark"
            : "border-transparent bg-surface-elevated dark:bg-surface-elevated-dark"
        }`}
      >
        <AppText variant="label" tone={selected ? "primary" : "default"}>
          {label}
        </AppText>
      </PressableScale>
    </Animated.View>
  )
}
