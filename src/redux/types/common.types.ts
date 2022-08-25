export type NumberOrNull = number | null
export type BooleanOrNull = boolean | null

export interface ErrorStatus {
  status: number
}

export type ErrorStatusOrNull = { status: number } | null

export interface ReturnErrorInterface {
  status: number
  message: string
}
