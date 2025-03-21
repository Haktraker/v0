// Public routes that don't require authentication
export const publicRoutes = [
  '/',
  '/products',
  '/solutions',
  '/pricing',
  '/company',
  '/auth/login',
  '/auth/register',
  '/request-demo',
]

// Routes that are always public and should redirect to dashboard if authenticated
export const authRoutes = [
  '/auth/login',
  '/auth/register',
]

// Default redirect path after login
export const DEFAULT_REDIRECT = '/dashboard'

/**
 * Check if a route is public
 * @param pathname - The current pathname
 * @returns boolean
 */
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname.toLowerCase()) || 
         pathname.startsWith('/auth/reset-password')
}

/**
 * Check if a route is an auth route (login/register)
 * @param pathname - The current pathname
 * @returns boolean
 */
export function isAuthRoute(pathname: string): boolean {
  return authRoutes.includes(pathname.toLowerCase())
}

/**
 * Check if a route is protected
 * @param pathname - The current pathname
 * @returns boolean
 */
export function isProtectedRoute(pathname: string): boolean {
  const path = pathname.toLowerCase()
  return !publicRoutes.includes(path) && !path.startsWith('/auth/')
} 