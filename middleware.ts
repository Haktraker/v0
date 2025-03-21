import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/products',
  '/solutions',
  '/pricing',
  '/company',
  '/request-demo',
]

// Add paths that require authentication
const protectedPaths = ['/dashboard', '/dashboard/reports', '/dashboard/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isPublicPath = publicPaths.some((path) => pathname === path)

  // If it's a protected path and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If it's a public auth path and there's a token, redirect to dashboard
  if (pathname === '/auth/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // For all other cases, continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
} 