"use client"

import { useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

export function ThemeInitializer() {
  const { setTheme } = useTheme()
  const storageKey = "haktrak-dashboard-theme"

  useEffect(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem(storageKey)

    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      // Apply the saved theme
      setTheme(savedTheme as "light" | "dark" | "system")
      console.log(`Theme initialized from localStorage: ${savedTheme}`)
    } else {
      // Default to system theme if no saved preference
      setTheme("system")
      console.log("No saved theme found, defaulting to system")
    }
  }, [])

  // This component doesn't render anything
  return null
}

