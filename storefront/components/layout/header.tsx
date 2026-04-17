'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import CartDrawer from '@/components/cart/cart-drawer'

const NAV_LINKS = [
  { label: 'Shop',      href: '/products' },
  { label: 'Our Kits',  href: '/products#kits' },
  { label: 'Reviews',   href: '/#reviews' },
  { label: 'About',     href: '/about' },
]

export default function Header() {
  const { itemCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) mobileMenuCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white ${
          isScrolled ? 'border-b-2 border-dinkra-green shadow-sm' : 'border-b border-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-dinkra-ink" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-start leading-none select-none">
              <span
                className="font-heading text-3xl tracking-wider text-dinkra-green"
                style={{ letterSpacing: '0.06em' }}
              >
                DINKRA
              </span>
              <span
                className="font-body text-[8px] font-semibold tracking-[0.3em] uppercase text-dinkra-ink -mt-0.5"
              >
                PICKLEBALL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold tracking-wide text-dinkra-ink hover:text-dinkra-green transition-colors uppercase"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5 text-dinkra-ink" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-dinkra-green text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white animate-slide-in-right flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-dinkra-sand">
              <span className="font-heading text-2xl text-dinkra-green tracking-wider">DINKRA</span>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-5 space-y-1 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3.5 text-lg font-semibold uppercase tracking-wide border-b border-dinkra-sand/60 text-dinkra-ink hover:text-dinkra-green transition-colors"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-dinkra-sand">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-dinkra-green text-white font-semibold py-3.5 rounded-full uppercase tracking-wide text-sm hover:opacity-90 transition-opacity"
              >
                Shop Starter Kits
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
