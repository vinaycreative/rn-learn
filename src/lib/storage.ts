import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Typed AsyncStorage helpers for application persistence.
 * Feature stores should use this boundary rather than calling AsyncStorage directly.
 * Persistence failures are swallowed so local-storage problems cannot crash the UI.
 */
export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key)
    } catch {
      return null
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch {
      // Persistence is best-effort. In-memory store state remains the source of truth.
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch {
      // Persistence is best-effort.
    }
  },
}
