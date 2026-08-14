import { Search, X } from "lucide-react-native"
import { Pressable, TextInput, View } from "react-native"

import { SURFACE_BORDER_CLASS } from "@/components/ui/surface"
import { colors, iconStroke } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

type SearchInputProps = {
  value: string
  onChangeText: (value: string) => void
  onSubmit: () => void
  onClear: () => void
  placeholder?: string
}

export function SearchInput({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder = "Search recipes by name",
}: SearchInputProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View className={`min-h-[52px] flex-row items-center rounded-full bg-surface-elevated px-lg dark:bg-surface-elevated-dark ${SURFACE_BORDER_CLASS}`}>
      <Search color={palette.foregroundMuted} size={20} strokeWidth={iconStroke} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        blurOnSubmit={false}
        accessibilityLabel="Search recipes"
        accessibilityHint="Enter a recipe name"
        accessibilityRole="search"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        submitBehavior="submit"
        placeholder={placeholder}
        placeholderTextColor={palette.foregroundMuted}
        className="min-h-[52px] flex-1 px-md text-base text-foreground dark:text-foreground-dark"
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
          onPress={onClear}
          className="h-11 w-11 items-center justify-center"
        >
          <X color={palette.foregroundMuted} size={20} strokeWidth={iconStroke} />
        </Pressable>
      ) : null}
    </View>
  )
}
