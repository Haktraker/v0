import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface SecurityPosture {
  assets: {
    total: number
    domains: number
    portals: number
  }
  threatIntelligence: {
    total: number
    iocs: number
    apiFeeds: number
    feeds: number
    geoWatch: number
    news: number
  }
  darkWebMentions: {
    total: number
    credentials: number
    corporateAssets: number
    brandMentions: number
  }
  accountTakeOver: {
    total: number
    atos: number
    impersonations: number
    vpProtection: number
  }
  vulnerabilities: {
    total: number
    low: number
    medium: number
    high: number
    critical: number
  }
  attackSurface: {
    total: number
    affectedSystems: number[]
  }
  threatDetections: {
    total: number
    byType: Array<{ type: string; count: number }>
  }
  brandReputation: {
    score: number
    trends: Array<{ date: string; score: number }>
  }
}

export interface ThreatDetection {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  details: string
}

export interface SocialMention {
  platform: string
  content: string
  sentiment: "positive" | "negative" | "neutral"
  timestamp: string
  reach: number
}

export const securityApi = createApi({
  reducerPath: "securityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getSecurityPosture: builder.query<SecurityPosture, void>({
      query: () => "security-posture",
    }),
    getThreatDetections: builder.query<ThreatDetection[], void>({
      query: () => "threat-detections",
    }),
    getSocialMentions: builder.query<SocialMention[], void>({
      query: () => "social-mentions",
    }),
    getVulnerabilities: builder.query<SecurityPosture["vulnerabilities"], void>({
      query: () => "vulnerabilities",
    }),
    getAssets: builder.query<SecurityPosture["assets"], void>({
      query: () => "assets",
    }),
    getThreatIntelligence: builder.query<SecurityPosture["threatIntelligence"], void>({
      query: () => "threat-intelligence",
    }),
    getDarkWebMentions: builder.query<SecurityPosture["darkWebMentions"], void>({
      query: () => "dark-web-mentions",
    }),
    getAccountTakeOver: builder.query<SecurityPosture["accountTakeOver"], void>({
      query: () => "account-takeover",
    }),
    getAttackSurface: builder.query<SecurityPosture["attackSurface"], void>({
      query: () => "attack-surface",
    }),
    getBrandReputation: builder.query<SecurityPosture["brandReputation"], void>({
      query: () => "brand-reputation",
    }),
  }),
}) 