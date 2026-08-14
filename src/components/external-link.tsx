import * as Linking from "expo-linking"
import { openBrowserAsync, WebBrowserPresentationStyle } from "expo-web-browser"
import { type ReactNode } from "react"
import { Pressable, type PressableProps } from "react-native"

type ExternalLinkProps = Omit<PressableProps, "onPress"> & {
  href: string
  children: ReactNode
}

export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  if (!isSafeExternalUrl(href)) {
    return null
  }

  return (
    <Pressable
      accessibilityRole="link"
      {...rest}
      onPress={() => {
        void openExternalUrl(href)
      }}
    >
      {children}
    </Pressable>
  )
}

async function openExternalUrl(url: string) {
  if (process.env.EXPO_OS === "web") {
    await Linking.openURL(url)
    return
  }

  await openBrowserAsync(url, {
    presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
  })
}

export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}
