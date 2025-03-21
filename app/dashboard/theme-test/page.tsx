"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeDebug } from "@/components/dashboard/theme-debug"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

export default function ThemeTestPage() {
  const { theme, setTheme } = useTheme()
  const [pageLoads, setPageLoads] = useState(0)

  useEffect(() => {
    // Get the page load count from sessionStorage
    const storedPageLoads = sessionStorage.getItem("theme-test-page-loads")
    const currentLoads = storedPageLoads ? Number.parseInt(storedPageLoads, 10) + 1 : 1

    // Update the count
    setPageLoads(currentLoads)
    sessionStorage.setItem("theme-test-page-loads", currentLoads.toString())
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Theme Persistence Test</h1>

      <ThemeDebug />

      <Card>
        <CardHeader>
          <CardTitle>Theme Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button onClick={() => setTheme("light")} variant={theme === "light" ? "default" : "outline"}>
                Light Mode
              </Button>
              <Button onClick={() => setTheme("dark")} variant={theme === "dark" ? "default" : "outline"}>
                Dark Mode
              </Button>
              <Button onClick={() => setTheme("system")} variant={theme === "system" ? "default" : "outline"}>
                System
              </Button>
            </div>

            <div className="pt-4">
              <p>
                <strong>Page Loads:</strong> {pageLoads}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This counter tracks how many times you've loaded this page in the current session. It should reset when
                you close the browser.
              </p>
            </div>

            <div className="pt-4">
              <p className="mb-2">Test navigation:</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline">
                  <Link href="/dashboard">Dashboard Home</Link>
                </Button>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Change the theme using the buttons above</li>
            <li>Navigate to the Dashboard Home and back to verify theme persistence across routes</li>
            <li>Reload the page to verify theme persistence across page reloads</li>
            <li>Close the browser and reopen to verify theme persistence across sessions</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

