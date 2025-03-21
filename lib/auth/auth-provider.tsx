"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import type { AuthUser, LoginCredentials } from '@/types/auth'
import { AuthService } from './auth-service'

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  setError: (error: string | null) => void
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authService = AuthService.getInstance()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start with true while checking token
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check for existing token and validate it
  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      setIsAuthenticated(true)
      // TODO: Implement user profile fetch endpoint
    }
    setIsLoading(false) // Set loading to false after checking token
  }, [])

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.login(credentials)
      setUser(response.data)
      setIsAuthenticated(true)
      toast.success("Successfully logged in!")
      
      // Get the redirect URL from the query parameters or default to dashboard
      const params = new URLSearchParams(window.location.search)
      const from = params.get('from') || '/dashboard'
      router.replace(from) // Use replace instead of push to prevent back navigation to login
    } catch (err: any) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
      router.replace('/auth/login')
    } catch (err: any) {
      toast.error('Logout failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        setError,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useRequireAuth() {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      const currentPath = window.location.pathname
      router.replace(`/auth/login?from=${encodeURIComponent(currentPath)}`)
    }
  }, [auth.isAuthenticated, auth.isLoading, router])

  return auth
}

