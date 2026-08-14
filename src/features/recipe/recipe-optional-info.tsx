import { ExternalLink as ExternalLinkIcon, Play } from "lucide-react-native"
import { Text, View } from "react-native"

import { ExternalLink, isSafeExternalUrl } from "@/components/external-link"
import { colors } from "@/constants/theme"
import type { Recipe } from "@/data/recipes"
import { useColorScheme } from "@/hooks/use-color-scheme"

type RecipeOptionalInfoProps = {
  recipe: Pick<Recipe, "tags" | "sourceUrl" | "youtubeUrl">
}

export function RecipeOptionalInfo({ recipe }: RecipeOptionalInfoProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const tags = recipe.tags.filter((tag) => tag.trim().length > 0)
  const sourceUrl = getSafeUrl(recipe.sourceUrl)
  const videoUrl = getSafeUrl(recipe.youtubeUrl)
  const hasTags = tags.length > 0
  const hasLinks = sourceUrl.length > 0 || videoUrl.length > 0

  if (!hasTags && !hasLinks) {
    return null
  }

  return (
    <View className="mt-xl px-lg">
      {hasTags ? (
        <View>
          <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark">Tags</Text>
          <View className="mt-md flex-row flex-wrap gap-sm">
            {tags.map((tag) => (
              <View key={tag} className="rounded-full bg-surface px-md py-sm dark:bg-surface-dark">
                <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {hasLinks ? (
        <View className={hasTags ? "mt-xl" : ""}>
          <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark">More</Text>
          <View className="mt-md overflow-hidden rounded-xl bg-surface dark:bg-surface-dark">
            {sourceUrl ? (
              <ExternalLink
                href={sourceUrl}
                accessibilityRole="link"
                accessibilityLabel="Open recipe source"
                className="min-h-[44px] flex-row items-center px-lg py-md"
              >
                <ExternalLinkIcon color={palette.primary} size={20} />
                <Text className="ml-md text-base font-medium text-primary dark:text-primary-dark">
                  Recipe source
                </Text>
              </ExternalLink>
            ) : null}
            {videoUrl ? (
              <ExternalLink
                href={videoUrl}
                accessibilityRole="link"
                accessibilityLabel="Open recipe video"
                className={`min-h-[44px] flex-row items-center px-lg py-md ${
                  sourceUrl ? "border-t border-border dark:border-border-dark" : ""
                }`}
              >
                <Play color={palette.primary} size={20} />
                <Text className="ml-md text-base font-medium text-primary dark:text-primary-dark">Watch video</Text>
              </ExternalLink>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  )
}

function getSafeUrl(url: string | null): string {
  const trimmed = url?.trim() ?? ""
  return trimmed && isSafeExternalUrl(trimmed) ? trimmed : ""
}
