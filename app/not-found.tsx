import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-cyber-darker">
      <div className="cyber-grid absolute inset-0 opacity-20"></div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Shield className="h-16 w-16 text-cyber-primary animate-pulse" />
        
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-cyber-primary">404</h1>
          <h2 className="text-2xl font-semibold text-white">Access Denied</h2>
          <p className="text-gray-400 max-w-md">
            The resource you're looking for has been moved, deleted, or never existed in this sector.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyber-primary/20 blur-xl"></div>
            <Button
              asChild
              className="relative bg-cyber-primary text-cyber-dark hover:bg-cyber-primary/90 transition-colors duration-200"
            >
              <Link href="/">Return to Base</Link>
            </Button>
          </div>

          <div className="font-mono text-xs text-gray-500">
            <span className="text-cyber-primary">Error Code:</span> SEC_ACCESS_DENIED_404
          </div>
        </div>

        <div className="absolute bottom-4 left-4 font-mono text-xs text-gray-600">
          <div>System: HAKTRAK_SECURE_NET</div>
          <div>Location: SECTOR_404</div>
          <div>Timestamp: {new Date().toISOString()}</div>
        </div>

        <div className="absolute top-0 right-0 p-8 font-mono text-xs text-gray-600 text-right">
          <div className="space-y-1">
            <div>Scanning network...</div>
            <div>Checking access logs...</div>
            <div>Verifying credentials...</div>
            <div className="text-cyber-primary">Access Denied</div>
          </div>
        </div>
      </div>
    </div>
  )
} 