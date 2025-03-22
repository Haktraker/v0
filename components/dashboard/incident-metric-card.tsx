"use client"

import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp, AlertCircle, Activity, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface IncidentMetricCardProps {
  title: string
  value: number
  trend: "up" | "down"
  trendValue: string
  icon: "alert-circle" | "activity" | "check-circle"
}

const iconMap = {
  "alert-circle": AlertCircle,
  "activity": Activity,
  "check-circle": CheckCircle,
}

export function IncidentMetricCard({
  title,
  value,
  trend,
  trendValue,
  icon,
}: IncidentMetricCardProps) {
  const Icon = iconMap[icon]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-200/50 dark:border-purple-900/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-muted-foreground" />
          <span className="text-lg font-medium">{title}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{value.toLocaleString()}</span>
            <div
              className={cn(
                "flex items-center gap-1 text-sm",
                trend === "up" ? "text-green-500" : "text-red-500"
              )}
            >
              {trend === "up" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span>{trendValue}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 