"use client"

import { useState, useMemo } from "react"
import { BlogCard } from "./blog-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogMetadata } from "@/lib/github"

interface BlogListProps {
  blogs: BlogMetadata[]
  allTags: string[]
}

export function BlogList({ blogs, allTags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Tag filter
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => blog.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [blogs, searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
  }

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedTags.length}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="gap-2">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Tag Filters */}
      {showFilters && allTags.length > 0 && (
        <div className="p-4 bg-card border border-border rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm font-medium text-foreground mb-3">Filter by tags</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-secondary",
                )}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredBlogs.length} {filteredBlogs.length === 1 ? "blog" : "blogs"} found
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} featured={index === 0 && !hasActiveFilters} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No blogs found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
