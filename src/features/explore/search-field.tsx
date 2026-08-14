import { Search, X } from "lucide-react-native"
import { Pressable, TextInput, View } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

type SearchFieldProps = {
  value: string
  onChangeText: (value: string) => void
  onSubmit: () => void
  onClear: () => void
}

export function SearchField({ value, onChangeText, onSubmit, onClear }: SearchFieldProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View className="min-h-[44px] flex-row items-center rounded-xl border border-border bg-surface-elevated px-md dark:border-border-dark dark:bg-surface-elevated-dark">
      <Search color={palette.foregroundMuted} size={20} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        accessibilityLabel="Search recipes"
        accessibilityRole="search"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        placeholder="Search recipes by name"
        placeholderTextColor={palette.foregroundMuted}
        className="min-h-[44px] flex-1 px-sm text-base text-foreground dark:text-foreground-dark"
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
          onPress={onClear}
          className="h-11 w-11 items-center justify-center"
        >
          <X color={palette.foregroundMuted} size={20} />
        </Pressable>
      ) : null}
    </View>
  )
}
