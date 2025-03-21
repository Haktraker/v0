"use client"

import { useEffect } from 'react'
import AOS from 'aos'
import { animations } from '@/components/aos-provider'

type AnimationKeys = keyof typeof animations
type AnimationConfig = typeof animations[AnimationKeys]

interface UseAOSOptions {
  animation: AnimationKeys
  customConfig?: Partial<AnimationConfig>
}

export function useAOS({ animation, customConfig = {} }: UseAOSOptions) {
  useEffect(() => {
    AOS.refresh()
  }, [])

  const baseConfig = animations[animation]
  return {
    ...baseConfig,
    ...customConfig,
  }
}

// Helper function to combine multiple animations
export function combineAnimations(...configs: AnimationConfig[]) {
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {})
}

// Example usage:
/*
import { useAOS, combineAnimations } from '@/hooks/use-aos'

function MyComponent() {
  const fadeUpAnimation = useAOS({ animation: 'fadeUp' })
  // or with custom config
  const customAnimation = useAOS({
    animation: 'fadeUp',
    customConfig: { 'data-aos-delay': '300' }
  })
  
  // Combine multiple animations
  const combinedAnimation = combineAnimations(
    animations.fadeUp,
    animations.zoomIn
  )

  return (
    <div {...fadeUpAnimation}>
      Animated content
    </div>
  )
}
*/

