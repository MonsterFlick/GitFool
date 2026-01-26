import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { BlogMetadata } from "@/lib/github"

interface FeaturedBlogsProps {
  blogs: BlogMetadata[]
}

export function FeaturedBlogs({ blogs }: FeaturedBlogsProps) {
  if (blogs.length === 0) return null

  const featuredBlogs = blogs.slice(0, 3)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Latest Articles</h2>
            <p className="text-muted-foreground">Fresh insights from the developer community</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-2">
            <Link href="/blog">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlogs.map((blog, index) => (
            <div
              key={blog.slug}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="gap-2 bg-transparent">
            <Link href="/blog">
              View all blogs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
