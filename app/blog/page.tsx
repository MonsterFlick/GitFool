import type { Metadata } from "next"
import { fetchBlogList, fetchAllTags } from "@/lib/github"
import { BlogList } from "@/components/blog-list"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Browse all tech articles on GitFool. Filter by tags and search for topics that interest you. Tutorials, guides, and insights from the developer community.",
  keywords: [
    "tech articles",
    "programming tutorials",
    "developer blog",
    "coding guides",
    "software engineering",
  ],
  openGraph: {
    title: "Blog | GitFool",
    description: "Browse all tech articles on GitFool",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
}

export const revalidate = 60 // Revalidate every minute

export default async function BlogPage() {
  const [blogs, allTags] = await Promise.all([fetchBlogList(), fetchAllTags()])

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          All Blogs
        </h1>
        <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Explore our collection of tech articles, tutorials, and insights from the developer community.
        </p>
      </div>

      {/* Blog list with search and filters */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <BlogList blogs={blogs} allTags={allTags} />
      </div>
    </div>
  )
}
