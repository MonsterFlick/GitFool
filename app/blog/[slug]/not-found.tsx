import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>

        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or may have been removed from the repository.
        </p>

        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to blogs
          </Link>
        </Button>
      </div>
    </div>
  )
}
