import { Link } from "expo-router"
import { Search, Shuffle } from "lucide-react-native"
import { ActivityIndicator, View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { IconButton } from "@/components/ui/button"
import { PressableScale } from "@/components/ui/pressable-scale"
import { SURFACE_BORDER_CLASS } from "@/components/ui/surface"
import { colors, iconStroke } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

type HomeHeaderProps = {
  onShuffle: () => void
  isShuffling: boolean
}

function getTimeGreeting(): string {
  const hour = new Date().getHours()

  if (hour < 12) {
    return "Good morning"
  }

  if (hour < 17) {
    return "Good afternoon"
  }

  return "Good evening"
}

export function HomeHeader({ onShuffle, isShuffling }: HomeHeaderProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View>
      <View className="min-h-[44px] flex-row items-center justify-between">
        <View className="min-w-0 flex-1 pr-md">
          <AppText variant="caption" tone="muted">
            {getTimeGreeting()} 👋
          </AppText>
          <AppText variant="subtitle" className="mt-xs">
            What are you cooking today?
          </AppText>
        </View>
        <IconButton
          accessibilityLabel="Discover another recipe"
          disabled={isShuffling}
          busy={isShuffling}
          fadeWhenDisabled={false}
          onPress={onShuffle}
        >
          {isShuffling ? (
            <ActivityIndicator color={palette.primary} />
          ) : (
            <Shuffle color={palette.primary} size={20} strokeWidth={iconStroke} />
          )}
        </IconButton>
      </View>

      <Link href="/explore" asChild>
        <PressableScale
          accessibilityRole="link"
          accessibilityLabel="Search recipes"
          accessibilityHint="Opens explore to search by name"
          className={`mt-lg min-h-component-md flex-row items-center rounded-full bg-surface-elevated px-lg dark:bg-surface-elevated-dark ${SURFACE_BORDER_CLASS}`}
        >
          <Search color={palette.foregroundMuted} size={18} strokeWidth={iconStroke} />
          <AppText variant="body" tone="muted" className="ml-md flex-1">
            Search recipes
          </AppText>
        </PressableScale>
      </Link>
    </View>
  )
}
