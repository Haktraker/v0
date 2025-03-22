import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // In a real application, you would:
    // 1. Validate the credentials against a database
    // 2. Hash the password before comparison
    // 3. Use proper session management
    // 4. Implement rate limiting
    // For demo purposes, we'll use hardcoded credentials
    if (username === "admin" && password === "admin") {
      // In production, use proper session management and secure cookie settings
      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      )

      // Set secure cookies with proper options in production
      response.cookies.set("session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })

      response.cookies.set("admin", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })

      return response
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 