"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'
import type { AuthUser, LoginCredentials, AuthState } from '@/types/auth'
import { AuthService } from './auth-service'
import { isProtectedRoute, isAuthRoute, DEFAULT_REDIRECT } from './route-protection'

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading'

interface AuthError {
  message: string
  code?: string
  status?: number
}

interface AuthContextType extends AuthState {
  status: AuthStatus
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  setError: (error: AuthError | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authService = AuthService.getInstance()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })
  const [status, setStatus] = useState<AuthStatus>("loading")
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const token = authService.getToken()
      const user = authService.getUser()

      if (token && user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        setStatus("authenticated")
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
        setStatus("unauthenticated")
      }
    }

    initializeAuth()
  }, [])

  // Handle route protection
  useEffect(() => {
    // Skip route protection check during initial load
    if (status === 'loading') return

    // Handle protected routes when user is not authenticated
    if (isProtectedRoute(pathname) && status === 'unauthenticated') {
      router.replace(`/auth/login?from=${encodeURIComponent(pathname)}`)
      return
    }

    // Handle auth routes when user is authenticated (redirect to dashboard)
    if (isAuthRoute(pathname) && status === 'authenticated') {
      router.push(DEFAULT_REDIRECT)
      return
    }
  }, [pathname, status, router])

  const handleLogin = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    setStatus("loading")

    try {
      const response = await authService.login(credentials)
      
      setState({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      setStatus("authenticated")
      
      toast.success("Successfully logged in!")
      
      // Get the redirect URL from the query parameters or default to dashboard
      const params = new URLSearchParams(window.location.search)
      const from = params.get('from')
      
      // Always use push for navigation after login to ensure proper history
      router.push(from || DEFAULT_REDIRECT)
    } catch (err) {
      const error = err as AuthError
      setState(prev => ({
        ...prev,
        isLoading: false,
        error,
        isAuthenticated: false,
      }))
      setStatus("unauthenticated")
      toast.error(error.message)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      setStatus("unauthenticated")
      router.replace('/auth/login')
    } catch (err) {
      const error = err as AuthError
      toast.error(error.message)
    }
  }

  const setError = (error: AuthError | null) => {
    setState(prev => ({ ...prev, error }))
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        status,
        login: handleLogin,
        logout: handleLogout,
        setError,
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
  const { status, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated" && isProtectedRoute(pathname)) {
      router.push(`/auth/login?from=${pathname}`)
    }
  }, [status, router, pathname])

  return { status, user }
}

