import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            <span className="text-sm text-muted-foreground">
              GitFool{" "}
              <span
                className="italic opacity-80"
                style={{ fontFamily: "var(--font-dancing-script), cursive" }}
              >
                by{" "}
                <a
                  href="https://omthakur.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Om Thakur
                </a>
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <a
              href="https://github.com/MonsterFlick/GitFool-Blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Content sourced from{" "}
            <a
              href="https://github.com/MonsterFlick/GitFool-Blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MonsterFlick/GitFool-Blogs
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
