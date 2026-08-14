export type DataErrorCode = "network" | "api" | "validation" | "not_found" | "empty"

export class DataError extends Error {
  readonly code: DataErrorCode
  override readonly cause?: unknown

  constructor(code: DataErrorCode, message: string, cause?: unknown) {
    super(message)
    this.name = "DataError"
    this.code = code
    this.cause = cause
  }
}

export function isDataError(error: unknown): error is DataError {
  return error instanceof DataError
}

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError"
}
