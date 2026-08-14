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

type ImageStatus = "loading" | "loaded" | "error"

export function RecipeImage({
  uri,
  recyclingKey,
  className,
  accessibilityLabel,
  priority,
  variant = "card",
}: RecipeImageProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const resolvedUri = toRecipeImageUri(uri, variant)
  const [status, setStatus] = useState<ImageStatus>(resolvedUri ? "loading" : "error")
  const imageLabel = accessibilityLabel ?? "Recipe photo"

  useEffect(() => {
    setStatus(resolvedUri ? "loading" : "error")
  }, [resolvedUri, recyclingKey])

  return (
    <View className={`overflow-hidden bg-surface dark:bg-surface-dark ${className ?? ""}`}>
      {status === "loading" ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="absolute inset-0 bg-surface dark:bg-surface-dark"
        />
      ) : null}

      {status !== "error" && resolvedUri ? (
        <Image
          source={{ uri: resolvedUri }}
          contentFit="cover"
          transition={200}
          recyclingKey={recyclingKey}
          priority={priority}
          cachePolicy="memory-disk"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={{ width: "100%", height: "100%" }}
          accessibilityLabel={imageLabel}
          accessibilityIgnoresInvertColors
        />
      ) : null}

      {status === "error" ? (
        <View
          className="absolute inset-0 items-center justify-center bg-surface dark:bg-surface-dark"
          accessibilityRole="image"
          accessibilityLabel={`${imageLabel} unavailable`}
        >
          <ImageOff color={palette.foregroundMuted} size={28} />
        </View>
      ) : null}
    </View>
  )
}
