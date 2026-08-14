import { ExternalLink as ExternalLinkIcon, Play } from "lucide-react-native"
import { View } from "react-native"

import { ExternalLink, isSafeExternalUrl } from "@/components/external-link"
import { AppText } from "@/components/ui/app-text"
import { TagChip } from "@/components/ui/chip"
import { SECTION_GAP_CLASS } from "@/components/ui/section-header"
import { Surface } from "@/components/ui/surface"
import { colors, iconStroke } from "@/constants/theme"
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
    <View className={`${SECTION_GAP_CLASS} px-xl`}>
      {hasTags ? (
        <View>
          <AppText variant="label">Tags</AppText>
          <View className="mt-md flex-row flex-wrap gap-sm">
            {tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </View>
        </View>
      ) : null}

      {hasLinks ? (
        <View className={hasTags ? SECTION_GAP_CLASS : ""}>
          <AppText variant="label">More</AppText>
          <Surface className="mt-md">
            {sourceUrl ? (
              <ExternalLink
                href={sourceUrl}
                accessibilityRole="link"
                accessibilityLabel="Open recipe source"
                className="min-h-[52px] flex-row items-center px-lg py-md"
              >
                <ExternalLinkIcon color={palette.primary} size={20} strokeWidth={iconStroke} />
                <AppText variant="label" tone="primary" className="ml-md">
                  Recipe source
                </AppText>
              </ExternalLink>
            ) : null}
            {videoUrl ? (
              <ExternalLink
                href={videoUrl}
                accessibilityRole="link"
                accessibilityLabel="Open recipe video"
                className={`min-h-[52px] flex-row items-center px-lg py-md ${
                  sourceUrl ? "border-t border-border dark:border-border-dark" : ""
                }`}
              >
                <Play color={palette.primary} size={20} strokeWidth={iconStroke} />
                <AppText variant="label" tone="primary" className="ml-md">
                  Watch video
                </AppText>
              </ExternalLink>
            ) : null}
          </Surface>
        </View>
      ) : null}
    </View>
  )
}

function getSafeUrl(url: string | null): string {
  const trimmed = url?.trim() ?? ""
  return trimmed && isSafeExternalUrl(trimmed) ? trimmed : ""
}
