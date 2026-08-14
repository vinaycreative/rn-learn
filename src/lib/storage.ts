import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Typed AsyncStorage helpers for application persistence.
 * Feature stores should use this boundary rather than calling AsyncStorage directly.
 */
export const storage = {
  async getItem(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key)
  },

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value)
  },

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key)
  },

  async getJSON<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key)

    if (raw === null) {
      return null
    }

    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  async setJSON<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  },
}
