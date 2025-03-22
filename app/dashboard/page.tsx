"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Edit, Filter } from "lucide-react"
import { IncidentMetricCard } from "@/components/dashboard/incident-metric-card"
import { SocialMetricCard } from "@/components/dashboard/social-metric-card"
import { securityApi, type SocialMention } from "@/lib/redux/services/securityApi"
import { Skeleton } from "@/components/ui/skeleton"

interface SocialMetricData {
  platform: string
  icon: string
  detected: number
  trend: "up" | "down"
  data: Array<{ name: string; value: number }>
}

export default function DashboardPage() {
  const { data: securityPosture, isLoading: isLoadingPosture } =
    securityApi.useGetSecurityPostureQuery()
  const { data: threatDetections, isLoading: isLoadingThreats } =
    securityApi.useGetThreatDetectionsQuery()
  const { data: socialMentions, isLoading: isLoadingSocial } =
    securityApi.useGetSocialMentionsQuery()

  const incidentMetrics = [
    {
      title: "Total Assets",
      value: securityPosture?.assets.total ?? 0,
      trend: "up" as const,
      trendValue: "+12%",
      icon: "alert-circle" as const,
    },
    {
      title: "Threat Intelligence",
      value: securityPosture?.threatIntelligence.total ?? 0,
      trend: "down" as const,
      trendValue: "-5%",
      icon: "activity" as const,
    },
    {
      title: "Dark Web Mentions",
      value: securityPosture?.darkWebMentions.total ?? 0,
      trend: "up" as const,
      trendValue: "+8%",
      icon: "check-circle" as const,
    },
  ]

  const socialMetricsData: SocialMetricData[] = socialMentions?.map((mention: SocialMention) => ({
    platform: mention.platform,
    icon: mention.platform.toLowerCase(),
    detected: mention.reach,
    trend: mention.sentiment === "positive" ? "up" : "down",
    data: Array(7)
      .fill(0)
      .map((_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 100),
      })),
  })) ?? []

  if (isLoadingPosture || isLoadingThreats || isLoadingSocial) {
    return (
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[200px]" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[140px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze your organization's security incidents
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 Days
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Dashboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidentMetrics.map((metric) => (
          <IncidentMetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {socialMetricsData.map((metric: SocialMetricData) => (
          <SocialMetricCard key={metric.platform} {...metric} />
        ))}
      </div>
    </div>
  )
}

