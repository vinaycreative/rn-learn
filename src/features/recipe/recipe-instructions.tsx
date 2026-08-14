import { AppText } from "@/components/ui/app-text"
import { InstructionStep } from "@/features/recipe/instruction-step"
import { View } from "react-native"

type RecipeInstructionsProps = {
  instructions: string | null
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  const steps = splitInstructionBlocks(instructions)

  if (steps.length === 0) {
    return (
      <View className="px-xl pt-md">
        <AppText variant="body" tone="muted">
          No instructions listed for this recipe.
        </AppText>
      </View>
    )
  }

  return (
    <View className="gap-lg px-xl pt-md">
      {steps.map((step, index) => (
        <InstructionStep key={`${index}-${step.slice(0, 24)}`} stepNumber={index + 1} text={step} />
      ))}
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
