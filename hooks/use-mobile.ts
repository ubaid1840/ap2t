import { useState, useEffect } from "react"

/**
 * useMobile - returns true if the screen width is below the specified breakpoint
 * @param breakpoint number - optional, default is 768px (Tailwind md)
 */
export const useMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to update isMobile based on current width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkMobile()

    // Listen to resize events
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  return isMobile
}
