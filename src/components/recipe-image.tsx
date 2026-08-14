import { Image } from "expo-image"
import { ImageOff } from "lucide-react-native"
import { useEffect, useState } from "react"
import { View } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { toRecipeImageUri, type RecipeImageVariant } from "@/lib/recipe-image-url"

type RecipeImageProps = {
  uri: string | null
  recyclingKey?: string
  className?: string
  accessibilityLabel?: string
  priority?: "low" | "normal" | "high"
  variant?: RecipeImageVariant
}

export function RecipeImage({
  uri,
  recyclingKey,
  className,
  accessibilityLabel,
  priority,
  variant = "thumb",
}: RecipeImageProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const [hasFailed, setHasFailed] = useState(false)
  const resolvedUri = toRecipeImageUri(uri, variant)
  const shouldShowImage = Boolean(resolvedUri) && !hasFailed
  const imageLabel = accessibilityLabel ?? "Recipe photo"

  useEffect(() => {
    setHasFailed(false)
  }, [resolvedUri, recyclingKey])

  return (
    <View className={`overflow-hidden bg-surface dark:bg-surface-dark ${className ?? ""}`}>
      {shouldShowImage ? (
        <Image
          source={{ uri: resolvedUri ?? undefined }}
          contentFit="cover"
          transition={200}
          recyclingKey={recyclingKey}
          priority={priority}
          cachePolicy="memory-disk"
          onError={() => setHasFailed(true)}
          style={{ width: "100%", height: "100%" }}
          accessibilityLabel={imageLabel}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <View
          className="flex-1 items-center justify-center"
          accessibilityRole="image"
          accessibilityLabel={`${imageLabel} unavailable`}
        >
          <ImageOff color={palette.foregroundMuted} size={28} />
        </View>
      )}
    </View>
  )
}
