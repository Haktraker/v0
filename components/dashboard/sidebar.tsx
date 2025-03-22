"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Database,
  Shield,
  AlertCircle,
  MessageSquare,
  Globe,
  Lock,
  Users,
  Building2,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Breached Databases",
    href: "/dashboard/breached",
    icon: Database,
  },
  {
    title: "Employees Malware Logs",
    href: "/dashboard/employees-logs",
    icon: AlertCircle,
  },
  {
    title: "Customers Malware Logs",
    href: "/dashboard/customers-logs",
    icon: Users,
  },
  {
    title: "Threats Hunting",
    href: "/dashboard/threats",
    icon: Shield,
  },
  {
    title: "Mentions Monitoring",
    href: "/dashboard/mentions",
    icon: MessageSquare,
  },
  {
    title: "Typo Squatting Domains",
    href: "/dashboard/domains",
    icon: Globe,
  },
  {
    title: "C-Level Protection",
    href: "/dashboard/protection",
    icon: Lock,
  },
  {
    title: "Third Party Monitoring",
    href: "/dashboard/monitoring",
    icon: Building2,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b border-border/50 px-4">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Shield className="h-6 w-6 text-purple-500 flex-shrink-0" />
            <span
              className={cn(
                "font-bold text-xl bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300",
                isCollapsed ? "w-32" : "w-64"
              )}
            >
              HakTrak
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "ml-auto h-8 w-8",
              isCollapsed && "rotate-180"
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                        isActive
                          ? "bg-purple-500 text-white shadow-md"
                          : "text-muted-foreground hover:bg-purple-100/50 dark:hover:bg-purple-900/20"
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="border-border/50">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </nav>
        </div>
        <div className="border-t border-border/50 p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-purple-100/50 dark:hover:bg-purple-900/20",
                  isCollapsed && "justify-center"
                )}
                onClick={() => {
                  // Handle logout
                }}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && "Logout"}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="border-border/50">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

