'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MESSAGES = [
  'Free shipping on orders over $75',
  'New here? Use code WELCOME10 for 10% off',
  '30-day returns, on us',
]

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % MESSAGES.length)
        setFading(false)
      }, 280)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="relative bg-brand-navy text-white">
      <div className="container-custom flex items-center justify-center py-2.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase font-medium">
        <p
          className="transition-opacity duration-300 text-center px-8"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {MESSAGES[current]}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 sm:right-4 p-1.5 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
