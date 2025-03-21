"use client"

import { useState, useEffect } from "react"
import { Eye, RefreshCw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "@/components/dashboard/clock"
import { SecurityScoreGaugeRecharts } from "@/components/dashboard/security-score-gauge-recharts"
import { CompromisedEmployees } from "@/components/dashboard/compromised-employees"
import { SourcesBarChartRecharts } from "@/components/dashboard/sources-bar-chart-recharts"
import { EmployeesDonutChartRecharts } from "@/components/dashboard/employees-donut-chart-recharts"
import { MetricsChartRecharts } from "@/components/dashboard/metrics-chart-recharts"
import {
  DashboardService,
  type CompromisedEmployee,
  type SourceData,
  type EmployeeGroup,
  type MetricData,
} from "@/lib/data/dashboard-service"
import { toast } from "sonner"
import { useThemePersistence } from "@/hooks/use-theme-persistence"
import { useRequireAuth } from '@/lib/auth/auth-provider'

export default function DashboardPage() {
  const { theme } = useThemePersistence()
  const { status, user } = useRequireAuth()

  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const [securityScore, setSecurityScore] = useState(0)
  const [compromisedEmployees, setCompromisedEmployees] = useState<CompromisedEmployee[]>([])
  const [sourcesData, setSourcesData] = useState<SourceData[]>([])
  const [employeesData, setEmployeesData] = useState<EmployeeGroup[]>([])
  const [metricsData, setMetricsData] = useState<MetricData[]>([])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [score, employees, sources, empData, metrics] = await Promise.all([
        DashboardService.getSecurityScore(),
        DashboardService.getCompromisedEmployees(),
        DashboardService.getSourcesData(),
        DashboardService.getEmployeesData(),
        DashboardService.getMetricsData(),
      ])

      setSecurityScore(score)
      setCompromisedEmployees(employees)
      setSourcesData(sources)
      setEmployeesData(empData)
      setMetricsData(metrics)

      setLastUpdated(new Date())

      toast.success("Dashboard data refreshed")
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to refresh dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleRefresh = () => {
    fetchDashboardData()
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
        <div className="animate-pulse">
          <Shield className="h-12 w-12 text-cyber-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-cyber-dark/80 border border-cyber-gray/20 backdrop-blur-sm rounded-lg p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome, {user?.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Content */}
            <div className="bg-cyber-dark/50 border border-cyber-gray/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-cyber-primary mb-4">Profile Overview</h2>
              <div className="space-y-3">
                <p className="text-gray-400">
                  <span className="text-gray-500">Email:</span> {user?.email}
                </p>
                <p className="text-gray-400">
                  <span className="text-gray-500">Role:</span>{' '}
                  <span className="capitalize">{user?.role}</span>
                </p>
                <p className="text-gray-400">
                  <span className="text-gray-500">Status:</span>{' '}
                  <span className="text-green-500">Active</span>
                </p>
              </div>
            </div>

            {/* Add more dashboard widgets here */}
          </div>
        </div>
      </div>
    </div>
  )
}

