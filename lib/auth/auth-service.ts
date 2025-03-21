import axios, { AxiosError } from 'axios'
import type { LoginCredentials, LoginResponse, AuthError, AuthUser } from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined')
}

const TOKEN_KEY = 'haktrak_auth_token'
const USER_KEY = 'haktrak_user'

export class AuthService {
  private static instance: AuthService
  private baseUrl: string
  private axiosInstance

  private constructor() {
    this.baseUrl = API_URL
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add response interceptor to handle errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const authError: AuthError = {
          message: error.response?.data?.message || 'An error occurred',
          code: error.code,
          status: error.response?.status,
        }
        return Promise.reject(authError)
      }
    )
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>('/auth/login', credentials)
      const { data, token } = response.data

      this.setToken(token)
      this.setUser(data)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw {
          message: error.response?.data?.message || 'Login failed',
          code: error.code,
          status: error.response?.status,
        } as AuthError
      }
      throw { message: 'An unexpected error occurred' } as AuthError
    }
  }

  async logout(): Promise<void> {
    try {
      // Optional: Call logout endpoint if your API has one
      // await this.axiosInstance.post('/auth/logout')
    } finally {
      this.clearAuth()
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await this.axiosInstance.post('/auth/refresh')
      const { token } = response.data
      this.setToken(token)
      return token
    } catch (error) {
      this.clearAuth()
      throw error
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
  }

  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  }

  private setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
  }

  private setUser(user: AuthUser): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private clearAuth(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  getAuthHeaders() {
    const token = this.getToken()
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    }
  }
} 