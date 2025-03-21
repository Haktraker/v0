"use client"

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface AOSProviderProps {
  children: React.ReactNode
}

const defaultAOSConfig = {
  offset: 120,
  delay: 0,
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
  disable: 'mobile', // Disable on mobile devices
}

export function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    // Initialize AOS
    AOS.init(defaultAOSConfig)

    // Update AOS on window resize
    window.addEventListener('resize', () => {
      AOS.refresh()
    })

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh()
      })
    }
  }, [])

  return <>{children}</>
}

// Animation presets for consistent usage
export const animations = {
  fadeUp: {
    'data-aos': 'fade-up',
    'data-aos-offset': '200',
  },
  fadeDown: {
    'data-aos': 'fade-down',
    'data-aos-offset': '200',
  },
  fadeLeft: {
    'data-aos': 'fade-left',
    'data-aos-offset': '200',
  },
  fadeRight: {
    'data-aos': 'fade-right',
    'data-aos-offset': '200',
  },
  fadeUpLong: {
    'data-aos': 'fade-up',
    'data-aos-offset': '400',
    'data-aos-duration': '1000',
  },
  zoomIn: {
    'data-aos': 'zoom-in',
    'data-aos-offset': '200',
  },
  zoomOut: {
    'data-aos': 'zoom-out',
    'data-aos-offset': '200',
  },
  flip: {
    'data-aos': 'flip-up',
    'data-aos-offset': '200',
  },
  // Add custom animation presets for cyberpunk theme
  glitch: {
    'data-aos': 'fade-up',
    'data-aos-offset': '200',
    'data-aos-duration': '600',
    'data-aos-easing': 'ease-in-out-back',
  },
  neonFade: {
    'data-aos': 'fade-up',
    'data-aos-offset': '200',
    'data-aos-duration': '800',
    'data-aos-easing': 'ease-in-out-cubic',
  },
  matrixReveal: {
    'data-aos': 'fade',
    'data-aos-offset': '200',
    'data-aos-delay': '50',
    'data-aos-duration': '1000',
  },
} as const

