export interface AuthUser {
  _id: string
  name: string
  email: string
  role: "admin" | "user"
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  data: AuthUser
  token: string
}

export interface AuthError {
  message: string
  code?: string
  status?: number
}

export type AuthStatus = "authenticated" | "unauthenticated" | "loading"

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
} 