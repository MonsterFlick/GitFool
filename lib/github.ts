import matter from "gray-matter"

const GITHUB_REPO = "MonsterFlick/GitFool-Blogs"
const GITHUB_API_BASE = "https://api.github.com"
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com"

export interface BlogAuthor {
  name: string
  github: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image: string
  author: BlogAuthor
  content: string
  sha: string
}

export interface BlogMetadata {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image: string
  author: BlogAuthor
  sha: string
}

interface GitHubFile {
  name: string
  path: string
  sha: string
  type: string
  download_url: string
}

// Fetch list of markdown files from repo
export async function fetchBlogList(): Promise<BlogMetadata[]> {
  console.log(`Fetching blogs from: ${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents`)
  const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status} ${response.statusText}`)
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`)
  }

  const files: GitHubFile[] = await response.json()
  console.log(`Found ${files.length} files in repo`)
  const markdownFiles = files.filter((file) => file.type === "file" && file.name.endsWith(".md"))

  const blogs = await Promise.all(
    markdownFiles.map(async (file) => {
      try {
        const content = await fetchRawFile(file.path)
        const { data } = matter(content)

        return {
          slug: file.name.replace(".md", ""),
          title: data.title || file.name.replace(".md", ""),
          description: data.description || "",
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          tags: Array.isArray(data.tags) ? data.tags : [],
          image: data.image || "",
          author: data.author || { name: "Anonymous", github: "" },
          sha: file.sha,
        } as BlogMetadata
      } catch (err) {
        console.error(`Failed to process file ${file.path}:`, err)
        return null
      }
    }),
  )

  return blogs
    .filter((blog): blog is BlogMetadata => blog !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Fetch raw file content
async function fetchRawFile(path: string): Promise<string> {
  const response = await fetch(`${GITHUB_RAW_BASE}/${GITHUB_REPO}/main/${path}`, {
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${path}`)
  }

  return response.text()
}

// Fetch single blog post by slug
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const content = await fetchRawFile(`${slug}.md`)
    const { data, content: markdownContent } = matter(content)

    // Get file SHA for cache validation
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents/${slug}.md`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 60 },
    })

    const fileData = response.ok ? await response.json() : { sha: "" }

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || "",
      author: data.author || { name: "Anonymous", github: "" },
      content: markdownContent,
      sha: fileData.sha || "",
    }
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

// Get all unique tags
export async function fetchAllTags(): Promise<string[]> {
  const blogs = await fetchBlogList()
  const tagSet = new Set<string>()

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => tagSet.add(tag))
  })

  return Array.from(tagSet).sort()
}
