"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityScoreGauge } from "@/components/dashboard/security-score-gauge"
import { CompromisedEmployees } from "@/components/dashboard/compromised-employees"
import { SourcesBarChart } from "@/components/dashboard/sources-bar-chart"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

// Mock data
const mockCompromisedEmployees = [
  { email: "employee1@gmail.com", score: 250 },
  { email: "employee2@gmail.com", score: 200 },
  { email: "employee3@gmail.com", score: 150 },
  { email: "employee4@gmail.com", score: 100 },
  { email: "employee5@gmail.com", score: 50 },
]

const mockSourcesData = [
  { name: "Source 1", value: 75 },
  { name: "Source 2", value: 45 },
  { name: "Source 3", value: 25 },
  { name: "Source 4", value: 65 },
  { name: "Source 5", value: 35 },
]

const mockMetrics = {
  threats: 1000,
  customers: 240,
  passwords: 240,
  emails: 234,
  devices: 234,
}

export default function DashboardPage() {
  const [securityScore, setSecurityScore] = useState(94)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your security metrics and employee activity
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              // Handle refresh
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Security Score */}
        <Card className="bg-card/50 backdrop-blur-sm border-purple-200/50 dark:border-purple-900/50">
          <CardHeader>
            <CardTitle>Organization Risk Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <SecurityScoreGauge score={securityScore} />
          </CardContent>
        </Card>

        {/* Compromised Employees */}
        <Card className="bg-card/50 backdrop-blur-sm border-purple-200/50 dark:border-purple-900/50">
          <CardHeader>
            <CardTitle>Most Compromised Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <CompromisedEmployees employees={mockCompromisedEmployees} />
          </CardContent>
        </Card>

        {/* Top Sources */}
        <Card className="bg-card/50 backdrop-blur-sm border-purple-200/50 dark:border-purple-900/50">
          <CardHeader>
            <CardTitle>Top Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <SourcesBarChart data={mockSourcesData} />
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      <Card className="bg-card/50 backdrop-blur-sm border-purple-200/50 dark:border-purple-900/50">
        <CardHeader>
          <CardTitle>Recent Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(mockMetrics).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col items-center justify-center rounded-lg bg-purple-50/50 dark:bg-purple-900/20 p-4 text-center"
              >
                <span className="text-2xl font-bold text-purple-500">{value}</span>
                <span className="text-sm text-muted-foreground capitalize">{key}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

