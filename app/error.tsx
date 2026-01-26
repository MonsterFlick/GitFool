"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Application error:", error)
    }, [error])

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            <div className="bg-destructive/10 text-destructive p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                {error.message || "We encountered an error while fetching the blog content."}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => window.location.reload()} variant="outline">
                    Refresh Page
                </Button>
                <Button onClick={() => reset()}>Try Again</Button>
            </div>
        </div>
    )
}
