"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4" />
            Tech blogs straight from GitHub
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Welcome to <span className="text-primary">GitFool</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Discover high-quality tech articles sourced directly from GitHub. Real-time updates, clean design, and a
            smooth reading experience for developers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
              <Link href="/blog">
                Explore Blogs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 w-full sm:w-auto bg-transparent">
              <a href="https://github.com/MonsterFlick/GitFool-Blogs" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
