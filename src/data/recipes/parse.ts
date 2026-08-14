import { z } from "zod"

import { DataError } from "@/data/errors"

export function parseApiPayload<T>(schema: z.ZodType<T>, payload: unknown, message: string): T {
  const result = schema.safeParse(payload)

  if (!result.success) {
    throw new DataError("validation", message, result.error)
  }

  return result.data
}
