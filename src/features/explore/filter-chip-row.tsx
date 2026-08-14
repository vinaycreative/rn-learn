import { Pressable, ScrollView, Text } from "react-native"

import { spacing } from "@/constants/theme"

type FilterChip = {
  id: string
  label: string
}

type FilterChipRowProps = {
  chips: FilterChip[]
  selectedId: string
  onSelect: (id: string) => void
  accessibilityLabel: string
}

export function FilterChipRow({ chips, selectedId, onSelect, accessibilityLabel }: FilterChipRowProps) {
  return (
    <ScrollView
      horizontal
      accessibilityLabel={accessibilityLabel}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={{ height: 44, flexGrow: 0 }}
      contentContainerStyle={{
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.sm,
        paddingRight: spacing.lg,
      }}
    >
      {chips.map((chip) => {
        const isSelected = chip.id === selectedId

        return (
          <Pressable
            key={chip.id}
            accessibilityRole="button"
            accessibilityLabel={chip.label}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(chip.id)}
            className={`min-h-[44px] items-center justify-center rounded-full px-lg ${
              isSelected
                ? "bg-primary dark:bg-primary-dark"
                : "bg-surface dark:bg-surface-dark"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isSelected
                  ? "text-primary-foreground dark:text-primary-foreground-dark"
                  : "text-foreground dark:text-foreground-dark"
              }`}
            >
              {chip.label}
            </Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}
