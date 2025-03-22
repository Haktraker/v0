import type { Metadata } from "next"
import './globals.css'

import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeInitializer } from "@/components/dashboard/theme-initializer"
import { Navbar } from "@/components/layout/navbar"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HakTrak - Cybersecurity Dashboard",
  description: "Monitor and manage your cybersecurity posture with HakTrak.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ThemeInitializer />
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}


