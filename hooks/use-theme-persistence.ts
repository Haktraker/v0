"use client"

import { useEffect } from "react"
import { useTheme as useNextTheme } from "next-themes"

export function useThemePersistence() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme()
  const storageKey = "haktrak-dashboard-theme"

  // Initialize theme from localStorage only once on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey)
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme)
    }
  }, []) // Empty dependency array since we only want this to run once on mount

  // Save theme changes to localStorage, but only when theme actually changes
  useEffect(() => {
    if (theme && theme !== localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, theme)
    }
  }, [theme])

  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light"
  }
}

