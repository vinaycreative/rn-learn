import { AppText } from "@/components/ui/app-text"
import { View } from "react-native"

type InstructionStepProps = {
  stepNumber: number
  text: string
}

export function InstructionStep({ stepNumber, text }: InstructionStepProps) {
  const label = formatStepNumber(stepNumber)

  return (
    <View className="flex-row gap-md">
      <AppText variant="label" tone="primary" className="w-8 shrink-0 pt-0.5">
        {label}
      </AppText>
      <AppText variant="body" className="min-w-0 flex-1">
        {text}
      </AppText>
    </View>
  )
}

export function formatStepNumber(stepNumber: number): string {
  return String(stepNumber).padStart(2, "0")
}
