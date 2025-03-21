"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { validatePassword, validateEmail } from "@/lib/auth/password-utils"
import { toast } from "sonner"

interface FormErrors {
  email: string | null
  password: string | null
  form: string | null
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    password: null,
    form: null,
  })
  
  const { login, status, error, setError } = useAuth()

  useEffect(() => {
    if (error) {
      setErrors(prev => ({ ...prev, form: error }))
    }
  }, [error])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: null,
      password: null,
      form: null,
    }

    // Clear previous errors
    setErrors(newErrors)
    setError(null)

    // Validate email
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await login({ email, password })
    } catch (err) {
      // Error is handled by the auth hook
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
      <div className="w-full max-w-md space-y-8 p-8 bg-cyber-dark/80 border border-cyber-gray/20 backdrop-blur-sm rounded-lg shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-cyber-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{" "}
            <Link href="/auth/register" className="text-cyber-primary hover:text-cyber-primary/80">
              create a new account
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-cyber-dark/50 border-cyber-gray/30 text-white placeholder-gray-400 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <div className="absolute right-0 top-0 h-full pr-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-cyber-dark/50 border-cyber-gray/30 text-white placeholder-gray-400 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>

          {/* Form Error */}
          {errors.form && (
            <div className="text-center p-2 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-sm text-red-500">{errors.form}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-cyber-primary hover:bg-cyber-primary/80"
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gray-400 hover:text-cyber-primary"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

