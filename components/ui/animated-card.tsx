'use client'

import { useAOS } from '@/hooks/use-aos'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'glitch' | 'neonFade' | 'matrixReveal'
  delay?: number
  className?: string
}

export function AnimatedCard({
  children,
  animation = 'fadeUp',
  delay = 0,
  className,
  ...props
}: AnimatedCardProps) {
  const aosProps = useAOS({
    animation,
    customConfig: delay ? { 'data-aos-delay': delay.toString() } : undefined,
  })

  return (
    <div
      className={cn(
        'rounded-lg bg-cyber-dark/80 border border-cyber-gray/20 p-6 backdrop-blur-sm',
        className
      )}
      {...aosProps}
      {...props}
    >
      {children}
    </div>
  )
}

// Example usage:
/*
import { AnimatedCard } from '@/components/ui/animated-card'

export default function MyPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatedCard animation="fadeUp" delay={0}>
        Card 1 Content
      </AnimatedCard>
      <AnimatedCard animation="fadeUp" delay={200}>
        Card 2 Content
      </AnimatedCard>
      <AnimatedCard animation="fadeUp" delay={400}>
        Card 3 Content
      </AnimatedCard>
    </div>
  )
}
*/ 