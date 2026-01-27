import { HeroSection } from "@/components/hero-section"
import { FeaturedBlogs } from "@/components/featured-blogs"
import { AboutSection } from "@/components/about-section"
import { fetchBlogList } from "@/lib/github"

export const runtime = "edge"

// export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  const blogs = await fetchBlogList()

  return (
    <>
      <HeroSection />
      <FeaturedBlogs blogs={blogs} />
      <AboutSection />
    </>
  )
}
