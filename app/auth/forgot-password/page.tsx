"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthLayout } from "@/components/auth-layout"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setEmailSent(true)
    toast({
      title: "Reset link sent!",
      description: "Please check your email for password reset instructions.",
    })

    setIsLoading(false)
  }

  const handleInputChange = (value: string) => {
    setEmail(value)
    if (error) {
      setError("")
    }
  }

  if (emailSent) {
    return (
      <AuthLayout>
        <Card className="border-0 shadow-2xl rounded-3xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mb-6 lg:hidden">
              <Image
                src="/images/planinsta-logo.png"
                alt="PlanInsta"
                width={150}
                height={40}
                className="h-8 w-auto mx-auto"
              />
            </div>

            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Check your email</CardTitle>

            <p className="text-gray-600 leading-relaxed">
              We've sent password reset instructions to <strong>{email}</strong>. Please check your inbox and follow the
              link to reset your password.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="space-y-4">
              {/* Back to Sign In */}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl h-12 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/auth/signin">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Sign In
                </Link>
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 text-center">
                <strong>Didn't receive the email?</strong>
                <br />
                Check your spam folder or contact support if you continue to have issues.
              </p>
            </div>
          </CardContent>
        </Card>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <Card className="border-0 shadow-2xl rounded-3xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="mb-6 lg:hidden">
            <Image
              src="/images/planinsta-logo.png"
              alt="PlanInsta"
              width={150}
              height={40}
              className="h-8 w-auto mx-auto"
            />
          </div>

          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Forgot your password?</CardTitle>

          <p className="text-gray-600 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className={`pl-10 rounded-2xl input-focus h-12 ${error ? "border-red-500 focus:border-red-500" : ""}`}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl h-12 font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>

            {/* Back to Sign In */}
            <div className="text-center pt-4">
              <Link
                href="/auth/signin"
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-600 text-center">
              <strong>Remember your password?</strong>
              <br />
              You can always go back to the sign in page and try again.
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
