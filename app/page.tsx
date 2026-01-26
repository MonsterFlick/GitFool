import { HeroSection } from "@/components/hero-section"
import { FeaturedBlogs } from "@/components/featured-blogs"
import { AboutSection } from "@/components/about-section"
import { fetchBlogList } from "@/lib/github"
import { AdUnit } from "@/components/ad-unit"

// export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  const blogs = await fetchBlogList()

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
