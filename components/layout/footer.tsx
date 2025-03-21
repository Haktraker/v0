"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Twitter, Linkedin, Github, Mail } from "lucide-react"

export function Footer() {
  const pathname = usePathname()

  // Don't render footer on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return (
    <footer className="bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-purple" />
              <span className="font-bold text-lg cyber-gradient">Haktrak Networks</span>
            </div>
            <p className="text-sm text-foreground/80 dark:text-white-45 max-w-xs">
              AI-powered eXtended Cyber Intelligence platform providing actionable and contextualized intelligence for
              cyber threat protection.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-foreground/60 dark:text-white-45 hover:text-purple dark:hover:text-purple transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-foreground/60 dark:text-white-45 hover:text-purple dark:hover:text-purple transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-foreground/60 dark:text-white-45 hover:text-purple dark:hover:text-purple transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-white tracking-wider uppercase mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {["Threat Intelligence", "Brand Protection", "Dark Web Monitoring", "Attack Surface Management"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/solutions/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-foreground/80 dark:text-white-45 hover:text-purple dark:hover:text-purple transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-white tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/company/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-foreground/80 dark:text-white-45 hover:text-purple dark:hover:text-purple transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground dark:text-white tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-foreground/60 dark:text-white-45 mr-2 mt-0.5" />
                <span className="text-sm text-foreground/80 dark:text-white-45">info@haktrak-networks.com</span>
              </li>
              <li>
                <Link
                  href="/request-demo"
                  className="inline-flex items-center px-4 py-2 border border-purple text-sm font-medium rounded-md text-purple hover:bg-purple hover:text-white transition-colors"
                >
                  Request a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8">
          <p className="text-center text-xs text-foreground/60 dark:text-white-45">
            &copy; {new Date().getFullYear()} Haktrak Networks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

