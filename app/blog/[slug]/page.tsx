import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, Github, User } from "lucide-react"
import { fetchBlogPost, fetchBlogList } from "@/lib/github"
import { parseMarkdown, extractTableOfContents, getReadingTime } from "@/lib/markdown"
// import { extractTableOfContents } from "@/lib/toc"
import { TableOfContents } from "@/components/table-of-contents"
import { CopyLinkButton } from "@/components/copy-link-button"
import { AdUnit } from "@/components/ad-unit"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

// export const revalidate = 60 // Revalidate every minute

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = await fetchBlogList()
  return blogs.map((blog) => ({ slug: blog.slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchBlogPost(slug)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gitfool.vercel.app"

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.image
        ? [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
        : [],
      url: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await fetchBlogPost(slug)

  if (!post) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gitfool.vercel.app"
  const htmlContent = await parseMarkdown(post.content)
  const tableOfContents = extractTableOfContents(post.content)
  const readingTime = getReadingTime(post.content)
  const formattedDate = format(new Date(post.date), "MMMM d, yyyy")

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image || undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.github ? `https://github.com/${post.author.github}` : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "GitFool",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    wordCount: post.content.trim().split(/\s+/).length,
    articleSection: post.tags[0] || "Technology",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen">
        {/* Hero section */}
        <header className="relative">
          {/* Cover image */}
          {post.image && (
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
          )}

          {/* Content overlay */}
          <div className={`container mx-auto px-4 ${post.image ? "relative -mt-48 md:-mt-56" : "pt-12"}`}>
            <div className="max-w-3xl">
              {/* Back button */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to blogs
                </Link>
              </Button>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  {post.author.github && (
                    <a
                      href={`https://github.com/${post.author.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Github className="h-3.5 w-3.5" />@{post.author.github}
                    </a>
                  )}
                </div>

                <span className="text-border">|</span>

                {/* Date */}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>

                <span className="text-border">|</span>

                {/* Reading time */}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </span>
              </div>

              {/* Copy link */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                <CopyLinkButton slug={slug} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex gap-12">
            {/* Main content */}
            <div className="flex-1 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              {/* Description */}
              {post.description && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{post.description}</p>
              )}

              {/* Article content */}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />

              {/* Bottom Ad */}
              <div className="mt-12 pt-8 border-t border-border">
                <AdUnit format="auto" slotId="auto-bottom-ad" />
              </div>
            </div>

            {/* Sidebar with ToC */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 flex flex-col gap-8">
                {tableOfContents.length > 0 && <TableOfContents items={tableOfContents} />}

                {/* Sidebar Ad */}
                <AdUnit format="rectangle" slotId="auto-sidebar-ad" className="min-h-[250px]" />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
