import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-lg transition-colors group">
      <div className="mb-4 bg-purple-bg-5 dark:bg-purple-bg-10 p-4 rounded-md inline-block group-hover:bg-purple-bg-10 dark:group-hover:bg-purple-bg-20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-purple transition-colors">{title}</h3>
      <p className="text-foreground/80 dark:text-white-85">{description}</p>
    </div>
  )
}

