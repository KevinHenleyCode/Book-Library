export type ServiceReturn<T = unknown[]> = {
  success: boolean
  message: string
  data?: T
}
