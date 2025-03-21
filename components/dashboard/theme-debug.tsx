"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeDebug() {
  const { theme } = useTheme()
  const [savedTheme, setSavedTheme] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("haktrak-dashboard-theme")
    setSavedTheme(storedTheme)
  }, [])

  useEffect(() => {
    if (mounted) {
      const storedTheme = localStorage.getItem("haktrak-dashboard-theme")
      setSavedTheme(storedTheme)
    }
  }, [theme, mounted])

  if (!mounted) return null

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Theme Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Current Theme:</strong> {theme}
          </p>
          <p>
            <strong>Saved in localStorage:</strong> {savedTheme || "None"}
          </p>
          <p>
            <strong>Dark Mode Class:</strong>{" "}
            {document.documentElement.classList.contains("dark") ? "Applied" : "Not Applied"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

