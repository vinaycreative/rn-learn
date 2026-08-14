import { Image } from "expo-image"
import { ImageOff } from "lucide-react-native"
import { useEffect, useState } from "react"
import { View } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

type RecipeImageProps = {
  uri: string | null
  recyclingKey?: string
  className?: string
}

export function RecipeImage({ uri, recyclingKey, className }: RecipeImageProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const [hasFailed, setHasFailed] = useState(false)
  const shouldShowImage = Boolean(uri) && !hasFailed

  useEffect(() => {
    setHasFailed(false)
  }, [uri, recyclingKey])

  return (
    <View className={`overflow-hidden bg-surface dark:bg-surface-dark ${className ?? ""}`}>
      {shouldShowImage ? (
        <Image
          source={{ uri: uri ?? undefined }}
          contentFit="cover"
          transition={200}
          recyclingKey={recyclingKey}
          onError={() => setHasFailed(true)}
          style={{ width: "100%", height: "100%" }}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <View className="flex-1 items-center justify-center" accessibilityElementsHidden>
          <ImageOff color={palette.foregroundMuted} size={28} />
        </View>
      )}
    </View>
  )
}
