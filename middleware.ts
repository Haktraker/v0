import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add any non-auth middleware here if needed
  return NextResponse.next()
}

export const config = {
  matcher: []
} 