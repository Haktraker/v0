import { NextResponse } from "next/server"

export async function GET() {
  // This would typically fetch from your actual API
  const mockData = {
    assets: {
      total: 46,
      domains: 42,
      portals: 2,
    },
    threatIntelligence: {
      total: 19,
      iocs: 2,
      apiFeeds: 1,
      feeds: 0,
      geoWatch: 0,
      news: 6,
    },
    darkWebMentions: {
      total: 7,
      credentials: 4,
      corporateAssets: 3,
      brandMentions: 0,
    },
    accountTakeOver: {
      total: 7,
      atos: 7,
      impersonations: 0,
      vpProtection: 0,
    },
    vulnerabilities: {
      total: 7,
      low: 1,
      medium: 2,
      high: 2,
      critical: 2,
    },
    attackSurface: {
      total: 1,
      affectedSystems: [1],
    },
    threatDetections: {
      total: 314,
      byType: [
        { type: "Phishing", count: 150 },
        { type: "Malware", count: 80 },
        { type: "Data Breach", count: 45 },
        { type: "Social Engineering", count: 39 },
      ],
    },
    brandReputation: {
      score: 62,
      trends: [
        { date: "2024-01", score: 58 },
        { date: "2024-02", score: 62 },
        { date: "2024-03", score: 65 },
      ],
    },
  }

  return NextResponse.json(mockData)
} 