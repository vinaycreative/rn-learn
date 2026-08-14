import { ChefHat, Shuffle } from "lucide-react-native"
import { ActivityIndicator, Pressable, Text, View } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

type HomeHeaderProps = {
  onShuffle: () => void
  isShuffling: boolean
}

export function HomeHeader({ onShuffle, isShuffling }: HomeHeaderProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View className="flex-row items-center justify-between">
      <View className="min-h-[44px] flex-1 flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary dark:bg-primary-dark">
          <ChefHat color={palette.primaryForeground} size={22} />
        </View>
        <View className="ml-md flex-1">
          <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">Recipe Explorer</Text>
          <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
            Discover something delicious
          </Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Discover another recipe"
        accessibilityState={{ busy: isShuffling, disabled: isShuffling }}
        disabled={isShuffling}
        onPress={onShuffle}
        className="h-11 w-11 items-center justify-center rounded-xl bg-surface dark:bg-surface-dark"
      >
        {isShuffling ? (
          <ActivityIndicator color={palette.primary} />
        ) : (
          <Shuffle color={palette.primary} size={22} />
        )}
      </Pressable>
    </View>
  )
}
