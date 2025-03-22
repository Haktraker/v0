import { NextResponse } from "next/server"

export async function GET() {
  const mockData = [
    {
      platform: "Twitter",
      content: "Great security measures by @company!",
      sentiment: "positive",
      timestamp: "2024-03-20T10:00:00Z",
      reach: 234,
    },
    {
      platform: "LinkedIn",
      content: "Concerned about recent security issues...",
      sentiment: "negative",
      timestamp: "2024-03-20T09:30:00Z",
      reach: 156,
    },
    {
      platform: "Facebook",
      content: "New security features look promising",
      sentiment: "positive",
      timestamp: "2024-03-20T09:00:00Z",
      reach: 89,
    },
    {
      platform: "Instagram",
      content: "Security update needed ASAP",
      sentiment: "negative",
      timestamp: "2024-03-20T08:30:00Z",
      reach: 67,
    },
  ]

  return NextResponse.json(mockData)
} 