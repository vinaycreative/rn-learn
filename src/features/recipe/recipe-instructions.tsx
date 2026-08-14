import { Text, View } from "react-native"

type RecipeInstructionsProps = {
  instructions: string | null
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  const steps = splitInstructionBlocks(instructions)

  if (steps.length === 0) {
    return null
  }

  return (
    <View className="mt-xl px-lg">
      <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark">Instructions</Text>
      <View className="mt-md">
        {steps.map((step, index) => (
          <View key={`${index}-${step.slice(0, 24)}`} className={index === 0 ? "" : "mt-lg"}>
            {steps.length > 1 ? (
              <Text className="mb-xs text-xs font-semibold uppercase tracking-wide text-primary dark:text-primary-dark">
                Step {index + 1}
              </Text>
            ) : null}
            <Text className="text-base leading-relaxed text-foreground dark:text-foreground-dark">{step}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export function splitInstructionBlocks(instructions: string | null): string[] {
  if (!instructions) {
    return []
  }

  const normalized = instructions.replace(/\r\n/g, "\n").trim()

  if (!normalized) {
    return []
  }

  const paragraphs = normalized
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)

  if (paragraphs.length > 1) {
    return paragraphs
  }

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  const steppedLineCount = lines.filter((line) => /^(?:\d+[\).\]:]|[-•])\s+/.test(line)).length

  if (lines.length > 1 && steppedLineCount >= Math.ceil(lines.length / 2)) {
    return lines.map((line) => line.replace(/^(?:\d+[\).\]:]|[-•])\s+/, "").trim()).filter(Boolean)
  }

  return [normalized]
}
