'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const MESSAGES = [
  'Free US shipping on orders over $65',
  '30-day hassle-free returns',
  'Gift-ready packaging on every order',
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
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="relative bg-dinkra-green text-white">
      <div className="container-custom flex items-center justify-center py-2.5 text-xs sm:text-sm tracking-widest uppercase font-body font-medium">
        <p
          className="transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {MESSAGES[current]}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
