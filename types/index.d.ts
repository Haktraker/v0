// Common interfaces and types used across the application
export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Common component props
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

// Form types
export interface FormField {
  id: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
  validation?: {
    required?: string
    pattern?: {
      value: RegExp
      message: string
    }
    minLength?: {
      value: number
      message: string
    }
  }
}

// API error type
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
} 