"use client"

import { useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

export function useThemePersistence() {
  const { theme, setTheme } = useTheme()
  const storageKey = "haktrak-dashboard-theme"

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey)
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme as "light" | "dark" | "system")
    }
  }, [])

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (theme) {
      localStorage.setItem(storageKey, theme)
    }
  }, [theme])

  return { theme, setTheme }
}

