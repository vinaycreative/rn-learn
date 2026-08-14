import { useEffect } from "react"
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

type SkeletonProps = {
  className: string
  accessibilityLabel?: string
}

export function Skeleton({ className, accessibilityLabel }: SkeletonProps) {
  const opacity = useSharedValue(0.45)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true)

    return () => {
      cancelAnimation(opacity)
    }
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      accessibilityLabel={accessibilityLabel}
      className={`bg-surface dark:bg-surface-dark ${className}`}
      style={animatedStyle}
    />
  )
}
