"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Globe, Menu, MapPin, Calendar, User, Route } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Home", labelJa: "ホーム", icon: null },
    { href: "/map", label: "Map", labelJa: "地図", icon: MapPin },
    { href: "/courses", label: "Courses", labelJa: "コース", icon: Route },
    { href: "/trip", label: "Plan", labelJa: "旅程", icon: Calendar },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">🗾</div>
          <span className="text-xl font-bold text-foreground">Kawaii Map</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Globe className="h-4 w-4 mr-1" />
            EN
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-1" />
            Sign In
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="text-2xl font-bold text-primary">🗾</div>
                <span className="text-xl font-bold text-foreground">Kawaii Map</span>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <div>
                      <div>{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.labelJa}</div>
                    </div>
                  </a>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Globe className="h-4 w-4 mr-2" />
                  Language / 言語
                </Button>
                <Button className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Sign In / ログイン
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
