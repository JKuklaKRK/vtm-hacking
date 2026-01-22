export interface User {
  id: number
  username: string
  password: string
  maxAccess: number
  accessTo: number[]
}