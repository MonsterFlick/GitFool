import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeSanitize from "rehype-sanitize"
import rehypeSlug from "rehype-slug"

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

// Parse markdown to HTML
export async function parseMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSanitize) // XSS protection
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeStringify)
    .process(content)

  return String(result)
}

// Extract table of contents from markdown
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const items: TableOfContentsItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    if (level <= 3) {
      // Only include h1, h2, h3
      items.push({ id, title, level })
    }
  }

  return items
}

// Get reading time estimate
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
