import { NextResponse } from "next/server"

export async function GET() {
  const mockData = [
    {
      id: "1",
      type: "Phishing",
      severity: "high",
      timestamp: "2024-03-20T10:00:00Z",
      details: "Suspicious phishing campaign targeting employees",
    },
    {
      id: "2",
      type: "Malware",
      severity: "critical",
      timestamp: "2024-03-20T09:30:00Z",
      details: "Ransomware detected in network traffic",
    },
    {
      id: "3",
      type: "Data Breach",
      severity: "medium",
      timestamp: "2024-03-20T09:00:00Z",
      details: "Potential data exfiltration detected",
    },
    {
      id: "4",
      type: "Social Engineering",
      severity: "low",
      timestamp: "2024-03-20T08:30:00Z",
      details: "Suspicious social media activity",
    },
  ]

  return NextResponse.json(mockData)
} 