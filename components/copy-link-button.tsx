"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link2, Check } from "lucide-react"

interface CopyLinkButtonProps {
  slug: string
}

export function CopyLinkButton({ slug }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = `${window.location.origin}/blog/${slug}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" />
          Copy link
        </>
      )}
    </Button>
  )
}
