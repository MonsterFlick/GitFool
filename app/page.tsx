import { HeroSection } from "@/components/hero-section"
import { FeaturedBlogs } from "@/components/featured-blogs"
import { AboutSection } from "@/components/about-section"
import { fetchBlogList, type BlogMetadata } from "@/lib/github"
import { AdUnit } from "@/components/ad-unit"

export const runtime = "edge"

// export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  let blogs: BlogMetadata[] = []
  let error = null

  try {
    blogs = await fetchBlogList()
  } catch (e: any) {
    error = e
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg inline-block border-destructive/20 border">
          <h2 className="text-2xl font-bold mb-4">Production Error Debugger</h2>
          <p className="font-mono bg-black/10 p-2 rounded mb-4 text-left whitespace-pre-wrap">
            {error.toString()}
          </p>
          <div className="text-sm text-left font-mono">
            <p><strong>Environment Check:</strong></p>
            <p>GITHUB_TOKEN Set: {process.env.GITHUB_TOKEN ? "✅ Yes" : "❌ No"}</p>
            <p>GITHUB_TOKEN Length: {process.env.GITHUB_TOKEN?.length || 0}</p>
            <p>Node Env: {process.env.NODE_ENV}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection />

      <div className="container mx-auto px-4">
        <AdUnit format="horizontal" slotId="home-top-ad" className="max-w-4xl mx-auto" />
      </div>

      <FeaturedBlogs blogs={blogs} />

      <div className="container mx-auto px-4">
        <AdUnit format="auto" slotId="home-bottom-ad" className="max-w-4xl mx-auto my-12" />
      </div>

      <AboutSection />
    </>
  )
}
