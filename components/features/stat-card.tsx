import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: ReactNode
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="bg-white/80 dark:bg-dark-card-translucent backdrop-blur-md p-6 rounded-lg">
      <div className="flex items-start">
        <div className="mr-4 bg-purple-bg-5 dark:bg-purple-bg-10 p-2 rounded-md">{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-foreground/80 dark:text-white-85">{title}</h3>
          <p className="text-2xl font-bold cyber-gradient">{value}</p>
          <p className="text-sm text-foreground/60 dark:text-white-45 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

