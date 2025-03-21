export interface AuthUser {
    _id: string
    name: string
    email: string
    role: string
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
  
  export interface AuthState {
    user: AuthUser | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
  } 