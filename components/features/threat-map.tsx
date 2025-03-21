"use client"

import { useEffect, useRef } from "react"

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node class
    class Node {
      x: number
      y: number
      radius: number
      color: string
      connections: Node[]
      speed: { x: number; y: number }
      isInfected: boolean
      pulseRadius: number
      pulseOpacity: number

      constructor(x: number, y: number, radius: number, color: string, isInfected = false) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.connections = []
        this.speed = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        }
        this.isInfected = isInfected
        this.pulseRadius = radius
        this.pulseOpacity = 1
      }

      update() {
        // Move node
        this.x += this.speed.x
        this.y += this.speed.y

        // Bounce off edges
        if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
          this.speed.x *= -1
        }

        if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
          this.speed.y *= -1
        }

        // Update pulse effect for infected nodes
        if (this.isInfected) {
          this.pulseRadius += 0.5
          this.pulseOpacity -= 0.01

          if (this.pulseOpacity <= 0) {
            this.pulseRadius = this.radius
            this.pulseOpacity = 1
          }
        }
      }

      draw() {
        if (!ctx) return

        // Draw connections
        this.connections.forEach((node) => {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)

          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y)

          if (this.isInfected || node.isInfected) {
            gradient.addColorStop(0, "rgba(138, 44, 226, 0.2)")
            gradient.addColorStop(1, "rgba(138, 44, 226, 0)")
          } else {
            gradient.addColorStop(0, "rgba(6, 182, 212, 0.2)")
            gradient.addColorStop(1, "rgba(6, 182, 212, 0)")
          }

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.stroke()
        })

        // Draw pulse for infected nodes
        if (this.isInfected) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(138, 44, 226, ${this.pulseOpacity * 0.3})`
          ctx.fill()
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.isInfected ? "rgb(138, 44, 226)" : this.color
        ctx.fill()
      }
    }

    // Create nodes
    const nodeCount = Math.floor((canvas.width * canvas.height) / 20000)
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 2 + 2
      const isInfected = Math.random() < 0.2

      const color = isInfected ? "rgb(138, 44, 226)" : "rgb(6, 182, 212)"

      nodes.push(new Node(x, y, radius, color, isInfected))
    }

    // Create connections
    nodes.forEach((node) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1

      for (let i = 0; i < connectionCount; i++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)]

        if (randomNode !== node && !node.connections.includes(randomNode)) {
          node.connections.push(randomNode)
        }
      }
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw()
      })
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.7 }} />
}

