import type { StateStorage } from "zustand/middleware"

import { storage } from "@/lib/storage"

/**
 * Zustand persist adapter that uses the application storage boundary.
 * Invalid JSON is treated as missing data so hydration cannot crash the app.
 */
export const zustandAsyncStorage: StateStorage = {
  async getItem(name) {
    const raw = await storage.getItem(name)

    if (raw === null) {
      return null
    }

    try {
      JSON.parse(raw)
      return raw
    } catch {
      await storage.removeItem(name)
      return null
    }
  },

  async setItem(name, value) {
    await storage.setItem(name, value)
  },

  async removeItem(name) {
    await storage.removeItem(name)
  },
}
