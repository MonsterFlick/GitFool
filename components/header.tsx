"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sun, Moon, Github, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">G</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-none">
                GitFool
              </span>
              <span
                className="text-base text-primary/80 group-hover:text-primary transition-colors -mt-0.5"
                style={{ fontFamily: "var(--font-dancing-script), cursive" }}
              >
                by Om Thakur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-foreground hidden sm:flex"
            >
              <a
                href="https://github.com/MonsterFlick/GitFool-Blogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://github.com/MonsterFlick/GitFool-Blogs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
