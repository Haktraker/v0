"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-provider"
import { useTheme as useNextTheme } from "next-themes"
import { Menu, X, Shield, ChevronDown, User, LogOut, Sun, Moon, LaptopIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Company", href: "/company" },
    { name: "Solutions", href: "/solutions" },
    { name: "Products", href: "/products" },
    { name: "Partners", href: "/partners" },
    { name: "Pricing", href: "/pricing" },
  ]

  // Avoid hydration mismatch by not rendering theme-specific elements until mounted
  const renderThemeChanger = () => {
    if (!mounted) return null

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {theme === "light" || (theme === "system" && resolvedTheme === "light") ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border-purple-10 dark:border-purple-30">
          <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value)}>
            <DropdownMenuRadioItem value="light" className="cursor-pointer">
              <Sun className="h-4 w-4 mr-2" />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="cursor-pointer">
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system" className="cursor-pointer">
              <LaptopIcon className="h-4 w-4 mr-2" />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-dark-card-translucent backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {!pathname.startsWith("/dashboard") && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple" />
              <span className="font-bold text-xl tracking-tight cyber-gradient">Haktrak Networks</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-purple ${
                    pathname.startsWith(item.href) ? "text-purple" : "text-foreground/80 dark:text-white-85"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {renderThemeChanger()}

              {isAuthenticated ? (
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    className="mr-2 text-foreground/80 dark:text-white-85 hover:text-foreground dark:hover:text-white"
                    asChild
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-background/50">
                        <User className="h-4 w-4 mr-2" />
                        {user?.name}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-background border-purple-10 dark:border-purple-30">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-purple-secondary">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-foreground/80 dark:text-white-85 hover:text-foreground dark:hover:text-white"
                    asChild
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button className="bg-purple text-white hover:bg-opacity-90" asChild>
                    <Link href="/request-demo">Request Demo</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {renderThemeChanger()}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-foreground dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground dark:text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-card border-t border-purple-10 dark:border-purple-30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname.startsWith(item.href)
                    ? "text-purple bg-purple-bg-5 dark:bg-purple-bg-10"
                    : "text-foreground/80 dark:text-white-85 hover:bg-purple-bg-5 dark:hover:bg-purple-bg-10 hover:text-foreground dark:hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 dark:text-white-85 hover:bg-purple-bg-5 dark:hover:bg-purple-bg-10 hover:text-foreground dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-purple-secondary hover:bg-purple-bg-5 dark:hover:bg-purple-bg-10"
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 dark:text-white-85 hover:bg-purple-bg-5 dark:hover:bg-purple-bg-10 hover:text-foreground dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/request-demo"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-purple text-white hover:bg-opacity-90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Demo
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

