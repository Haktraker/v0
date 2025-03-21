"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Eye,
  Lock,
  Search,
  AlertTriangle,
  ArrowRight,
  Globe,
  Database,
  UserCheck,
  BarChart3,
  Clock,
} from "lucide-react"
import { ThreatMap } from "@/components/features/threat-map"
import { StatCard } from "@/components/features/stat-card"
import { FeatureCard } from "@/components/features/feature-card"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const scrollY = window.scrollY
        if (heroRef.current) {
          heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
          heroRef.current.style.opacity = `${1 - scrollY * 0.002}`
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-white dark:bg-dark-bg">
        {/* Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>

        {/* Parallax Background */}
        <div ref={heroRef} className="absolute inset-0 flex items-center justify-center">
          <ThreatMap />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10 pt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 cyber-gradient glow-text">
            AI-Powered Cyber Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 dark:text-white-85 max-w-3xl mb-8">
            Protect your digital assets with actionable intelligence and comprehensive dark web monitoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-purple text-white hover:bg-opacity-90 glow" asChild>
              <Link href="/request-demo">
                Request Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple text-purple dark:text-white hover:bg-purple-bg-5 dark:hover:bg-purple-bg-10"
              asChild
            >
              <Link href="/solutions">Explore Solutions</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
            <StatCard
              title="Threats Detected"
              value="10M+"
              description="Monthly cyber threats identified"
              icon={<AlertTriangle className="h-6 w-6 text-purple-secondary" />}
            />
            <StatCard
              title="Dark Web Coverage"
              value="98%"
              description="Of known dark web sources monitored"
              icon={<Eye className="h-6 w-6 text-purple" />}
            />
            <StatCard
              title="Response Time"
              value="< 15min"
              description="Average threat response time"
              icon={<Clock className="h-6 w-6 text-cyber-accent" />}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-foreground/60 dark:text-white-45 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-foreground/30 dark:border-white-45 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-foreground/60 dark:bg-white-45 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive <span className="cyber-gradient">Protection</span>
            </h2>
            <p className="text-foreground/80 dark:text-white-85 max-w-2xl mx-auto">
              Our platform provides end-to-end security solutions to protect your organization from evolving cyber
              threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Dark Web Monitoring"
              description="Continuous monitoring of dark web forums, marketplaces, and channels to detect leaked credentials and sensitive data"
              icon={<Eye className="h-10 w-10 text-purple" />}
            />
            <FeatureCard
              title="Threat Intelligence"
              description="AI-powered analysis of emerging threats with actionable insights to strengthen your security posture"
              icon={<Shield className="h-10 w-10 text-cyber-accent" />}
            />
            <FeatureCard
              title="Brand Protection"
              description="Detect and respond to brand impersonation, phishing attempts, and reputation threats"
              icon={<Lock className="h-10 w-10 text-purple-secondary" />}
            />
            <FeatureCard
              title="Attack Surface Management"
              description="Discover and secure your external digital footprint to minimize potential attack vectors"
              icon={<Search className="h-10 w-10 text-purple" />}
            />
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-purple text-white hover:bg-opacity-90" asChild>
              <Link href="/solutions">
                View All Solutions <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-purple-bg-5 dark:bg-dark-purple relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="cyber-gradient">Haktrak Networks</span> Works
            </h2>
            <p className="text-foreground/80 dark:text-white-85 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive protection through a four-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple text-white flex items-center justify-center font-bold">
                1
              </div>
              <Globe className="h-12 w-12 mb-4 text-purple" />
              <h3 className="text-xl font-bold mb-2">Continuous Monitoring</h3>
              <p className="text-foreground/80 dark:text-white-85">
                Our platform scans the surface, deep, and dark web 24/7 to identify potential threats to your
                organization
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-lg relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple text-white flex items-center justify-center font-bold">
                2
              </div>
              <Database className="h-12 w-12 mb-4 text-cyber-accent" />
              <h3 className="text-xl font-bold mb-2">Data Collection</h3>
              <p className="text-foreground/80 dark:text-white-85">
                We collect and process vast amounts of data from various sources to provide comprehensive coverage
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-lg relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple text-white flex items-center justify-center font-bold">
                3
              </div>
              <BarChart3 className="h-12 w-12 mb-4 text-purple-secondary" />
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-foreground/80 dark:text-white-85">
                Our AI algorithms analyze the collected data to identify patterns, anomalies, and potential threats
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-lg relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple text-white flex items-center justify-center font-bold">
                4
              </div>
              <UserCheck className="h-12 w-12 mb-4 text-purple" />
              <h3 className="text-xl font-bold mb-2">Actionable Intelligence</h3>
              <p className="text-foreground/80 dark:text-white-85">
                We provide actionable insights and recommendations to help you respond to threats effectively
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-dark-card p-8 md:p-12 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to secure your digital assets?</h2>
                <p className="text-foreground/80 dark:text-white-85 max-w-xl">
                  Get started with Haktrak Networks today and experience the power of AI-driven cyber intelligence
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple text-white hover:bg-opacity-90" asChild>
                  <Link href="/request-demo">Request Demo</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple text-purple dark:text-white hover:bg-purple-bg-5 dark:hover:bg-purple-bg-10"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

