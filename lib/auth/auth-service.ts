import axios from 'axios'
import type { LoginCredentials, LoginResponse } from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export class AuthService {
  private static instance: AuthService
  private baseUrl: string

  private constructor() {
    this.baseUrl = API_URL as string
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseUrl}/api/auth/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data && response.data.token) {
        this.setToken(response.data.token)
        return response.data
      }

      throw new Error('Invalid response from server')
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Login failed. Please try again.')
    }
  }

  async logout(): Promise<void> {
    this.removeToken()
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  getAuthHeaders() {
    const token = this.getToken()
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    }
  }
} 