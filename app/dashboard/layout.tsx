"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeInitializer } from "@/components/dashboard/theme-initializer"
import { useThemePersistence } from "@/hooks/use-theme-persistence"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize theme persistence
  useThemePersistence()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="haktrak-dashboard-theme"
      disableTransitionOnChange={false}
    >
      <ThemeInitializer />
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <main className="lg:pl-16 min-h-screen transition-[padding] duration-300">
          <div className="container mx-auto p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

