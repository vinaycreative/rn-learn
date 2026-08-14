import { Text, type TextProps } from "react-native"

import { textVariants, type AppTextVariant } from "@/constants/theme"

type AppTextTone = "default" | "muted" | "primary" | "error" | "inverse" | "onPrimary"

type AppTextProps = TextProps & {
  variant?: AppTextVariant
  tone?: AppTextTone
}

const toneClassNames: Record<AppTextTone, string> = {
  default: "text-foreground dark:text-foreground-dark",
  muted: "text-foreground-muted dark:text-foreground-muted-dark",
  primary: "text-primary dark:text-primary-dark",
  error: "text-error dark:text-error-dark",
  inverse: "text-white",
  onPrimary: "text-primary-foreground dark:text-primary-foreground-dark",
}

export function AppText({
  variant = "body",
  tone = "default",
  className,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      className={`${toneClassNames[tone]} ${className ?? ""}`}
      style={[textVariants[variant], style]}
    />
  )
}
