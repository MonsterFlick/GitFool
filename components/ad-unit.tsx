"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface AdUnitProps {
    /**
     * Google AdSense Slot ID (optional for auto ads, required for manual units)
     */
    slotId?: string
    /**
     * Ad format (auto, rectangle, horizontal, vertical)
     * Default: "auto"
     */
    format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid"
    /**
     * Layout key (optional, for in-feed ads)
     */
    layoutKey?: string
    /**
     * Custom class names
     */
    className?: string
    /**
     * Style object
     */
    style?: React.CSSProperties
}

declare global {
    interface Window {
        adsbygoogle: any[]
    }
}

export function AdUnit({
    slotId,
    format = "auto",
    layoutKey,
    className = "",
    style = { display: "block" }
}: AdUnitProps) {
    const pathname = usePathname()
    const adRef = useRef<HTMLModElement>(null)
    const [isDev, setIsDev] = useState(false)

    useEffect(() => {
        // Check if we are in development environment
        setIsDev(process.env.NODE_ENV === "development")
    }, [])

    useEffect(() => {
        try {
            if (typeof window !== "undefined" && !isDev) {
                // Push the ad to Google's queue
                ; (window.adsbygoogle = window.adsbygoogle || []).push({})
            }
        } catch (err) {
            console.error("AdSense error:", err)
        }
    }, [pathname, isDev])

    const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

    if (!publisherId) return null

    // Show placeholder in development
    if (isDev) {
        return (
            <div
                className={`bg-secondary/50 border border-border border-dashed rounded-lg flex items-center justify-center text-muted-foreground text-sm p-4 text-center select-none ${className}`}
                style={{ ...style, minHeight: "100px" }}
            >
                <div>
                    <p className="font-semibold">Google AdSense</p>
                    <p className="text-xs opacity-70 mt-1">Format: {format}</p>
                    {slotId && <p className="text-xs opacity-70">Slot: {slotId}</p>}
                </div>
            </div>
        )
    }

    return (
        <div className={`ad-container overflow-hidden my-6 ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={style}
                data-ad-client={publisherId}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
                data-ad-layout-key={layoutKey}
            />
        </div>
    )
}
