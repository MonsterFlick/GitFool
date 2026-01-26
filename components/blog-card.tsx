"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { BlogMetadata } from "@/lib/github"

interface BlogCardProps {
  blog: BlogMetadata
  featured?: boolean
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const formattedDate = formatDistanceToNow(new Date(blog.date), { addSuffix: true })

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={cn(
        "group block bg-card rounded-xl border border-border overflow-hidden transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        featured && "md:col-span-2",
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden bg-secondary", featured ? "aspect-[2/1]" : "aspect-video")}>
        {blog.image ? (
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">G</span>
            </div>
          </div>
        )}

        {/* Tags overlay */}
        {blog.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm text-foreground text-xs"
              >
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 2 && (
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground text-xs">
                +{blog.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className={cn(
            "font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors",
            featured ? "text-xl md:text-2xl" : "text-lg",
          )}
        >
          {blog.title}
        </h3>

        <p className={cn("text-muted-foreground mb-4 line-clamp-2", featured ? "text-base" : "text-sm")}>
          {blog.description || "No description available"}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {blog.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
          </div>

          <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read more
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
