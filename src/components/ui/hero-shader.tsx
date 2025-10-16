import type React from "react"
import { useEffect, useRef, useMemo, lazy, Suspense } from "react"

// Lazy load the shader component for better performance
const MeshGradient = lazy(() => 
  import("@paper-design/shaders-react").then(module => ({ 
    default: module.MeshGradient 
  }))
)

interface ShaderBackgroundProps {
  children: React.ReactNode
  height?: string
  reducedMotion?: boolean
}

export function ShaderBackground({ 
  children, 
  height = "min-h-[85vh]",
  reducedMotion = false 
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches || reducedMotion
    }
    return reducedMotion
  }, [reducedMotion])

  // Memoize gradient colors to prevent re-renders
  const gradientColors = useMemo(() => ({
    primary: ["#000000", "#8b5cf6", "#1e1b4b", "#4c1d95"],
    secondary: ["#000000", "#8b5cf6", "#000000"]
  }), [])

  return (
    <div ref={containerRef} className={`w-full relative overflow-hidden ${height}`}>
      {/* Fallback gradient for loading/no-JS */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-900 to-black" />
      
      {/* Optimized shader rendering */}
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={gradientColors.primary}
            speed={0.15}
          />
        </Suspense>
      )}

      {/* Content overlay with theme-aware gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      
      {children}
    </div>
  )
}
