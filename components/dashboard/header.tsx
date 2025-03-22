"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { useThemePersistence } from "@/hooks/use-theme-persistence"

export function DashboardHeader() {
  const { isDark } = useThemePersistence()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center gap-4">
          <form className="flex-1 md:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full min-w-[300px] pl-8 bg-background shadow-none border-muted appearance-none md:w-[300px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-500" />
          </Button>
          <ModeToggle />
          <div className="h-6 w-px bg-border" />
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <span className="hidden md:inline-flex">Get Dashboard</span>
          </Button>
          <Button
            variant="default"
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Data Range
          </Button>
        </div>
      </div>
    </header>
  )
}

