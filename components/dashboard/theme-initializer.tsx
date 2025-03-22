"use client"

import { useThemePersistence } from "@/hooks/use-theme-persistence"

export function ThemeInitializer() {
  // Initialize theme persistence
  useThemePersistence()
  
  // This component doesn't render anything
  return null
}

