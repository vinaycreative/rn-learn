import { isDataError } from "@/data/errors"

export function getUserFacingErrorMessage(error: unknown): string {
  if (isDataError(error)) {
    return error.message
  }

  return "Something went wrong. Please try again."
}
