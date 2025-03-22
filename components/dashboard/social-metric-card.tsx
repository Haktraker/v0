"use client"

import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

interface SocialMetricCardProps {
  platform: string
  icon: string
  detected: number
  trend: "up" | "down"
  data: Array<{ name: string; value: number }>
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
}

const platformColors = {
  twitter: "#1DA1F2",
  linkedin: "#0A66C2",
  facebook: "#1877F2",
  instagram: "#E4405F",
}

export function SocialMetricCard({
  platform,
  icon,
  detected,
  trend,
  data,
}: SocialMetricCardProps) {
  const Icon = platformIcons[icon as keyof typeof platformIcons]
  const color = platformColors[icon as keyof typeof platformColors]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-200/50 dark:border-purple-900/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6" style={{ color }} />
          <span className="text-lg font-medium">{platform}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{detected}</span>
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
            </div>
          </div>
          <span className="text-sm text-muted-foreground">Detected</span>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`gradient-${icon}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Value:</span>
                        <span className="font-medium">
                          {payload[0].value}
                        </span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${icon})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 