"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock signup - replace with actual authentication
    setTimeout(() => {
      console.log("Signup attempt:", formData)
      setIsLoading(false)
      // Redirect to verification or dashboard
    }, 1000)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-mint to-kawaii-peach flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-kawaii-forest">はじめまして！</CardTitle>
          <CardDescription className="text-kawaii-sage">Create your account / アカウントを作成</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-kawaii-forest">
                お名前 / Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-kawaii-sage" />
                <Input
                  id="name"
                  type="text"
                  placeholder="山田太郎"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-kawaii-forest">
                メールアドレス / Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-kawaii-sage" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-kawaii-forest">
                パスワード / Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-kawaii-sage" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-kawaii-sage" />
                  ) : (
                    <Eye className="h-4 w-4 text-kawaii-sage" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-kawaii-forest">
                パスワード確認 / Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-kawaii-sage" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-kawaii-sage" />
                  ) : (
                    <Eye className="h-4 w-4 text-kawaii-sage" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-kawaii-sage">
                  <Link href="/terms" className="text-kawaii-coral hover:underline">
                    利用規約
                  </Link>
                  と
                  <Link href="/privacy" className="text-kawaii-coral hover:underline">
                    プライバシーポリシー
                  </Link>
                  に同意します
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.agreeToNewsletter}
                  onCheckedChange={(checked) => updateFormData("agreeToNewsletter", checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm text-kawaii-sage">
                  お得な情報やニュースレターを受け取る
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-kawaii-coral hover:bg-kawaii-coral/90"
              disabled={isLoading || !formData.agreeToTerms}
            >
              {isLoading ? "アカウント作成中..." : "アカウント作成 / Sign Up"}
            </Button>
          </form>

          <Separator />

          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-transparent">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Googleで登録
            </Button>
          </div>

          <div className="text-center text-sm text-kawaii-sage">
            すでにアカウントをお持ちの方は{" "}
            <Link href="/login" className="text-kawaii-coral hover:underline">
              ログイン
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
