import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    // In a real application, you would check for a valid session/token
    // and verify the user's admin role. For now, we'll just redirect
    // to a login page if there's no session.
    const isAuthenticated = request.cookies.has("session")
    const isAdmin = request.cookies.has("admin")

    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/admin/:path*",
} 