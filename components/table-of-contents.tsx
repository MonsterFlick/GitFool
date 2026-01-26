"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { List } from "lucide-react"
import type { TableOfContentsItem } from "@/lib/markdown"

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0% -80% 0%" },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
        <List className="h-4 w-4" />
        On this page
      </div>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1.5 text-muted-foreground hover:text-foreground transition-colors border-l-2 pl-3 -ml-px",
                activeId === item.id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent hover:border-border",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
