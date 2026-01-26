"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false)

    useEffect(() => {
        // Check if user has already dismissed the popup
        const dismissed = localStorage.getItem("welcome-popup-dismissed")
        if (!dismissed) {
            // Show popup after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 3000) // Show after 3 seconds
            return () => clearTimeout(timer)
        } else {
            setHasBeenDismissed(true)
        }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem("welcome-popup-dismissed", "true")
        setHasBeenDismissed(true)
    }

    if (hasBeenDismissed || !isVisible) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-card border border-border rounded-xl shadow-2xl p-5 max-w-sm relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Content */}
                <div className="pr-6">
                    <p
                        className="text-xl text-foreground mb-1"
                        style={{ fontFamily: "var(--font-dancing-script), cursive" }}
                    >
                        Hi, I'm Om Thakur! 👋
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                        Welcome to GitFool! Want to know more about me and my other projects?
                    </p>

                    <div className="flex gap-2">
                        <Button asChild size="sm" className="gap-1.5">
                            <a
                                href="https://omthakur.in"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit My Site
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDismiss}
                        >
                            Maybe Later
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
