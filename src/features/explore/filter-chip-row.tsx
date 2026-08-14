import { Chip } from "@/components/ui/chip"
import { spacing } from "@/constants/theme"
import { ScrollView } from "react-native"

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
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          selected={chip.id === selectedId}
          onPress={() => onSelect(chip.id)}
        />
      ))}
    </ScrollView>
  )
}
