'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import CartDrawer from '@/components/cart/cart-drawer'

const NAV_LINKS = [
  { label: 'Shop',        href: '/products' },
  { label: 'Collections', href: '/collections' },
  { label: 'About',       href: '/about' },
  { label: 'Contact',     href: '/contact' },
]

export default function Header() {
  const { itemCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
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
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-border'
            : 'bg-background border-b border-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 lg:h-18 items-center justify-between gap-4">

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-brand-navy" strokeWidth={2} />
            </button>

            {/* Desktop Left Nav */}
            <nav className="hidden lg:flex items-center gap-7 flex-1 basis-0">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-brand-navy/85 hover:text-brand-coral transition-colors"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo (centered on desktop) */}
            <Link href="/" className="flex items-center select-none lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <span className="font-heading text-2xl font-bold tracking-tight text-brand-navy">
                My Store
              </span>
              <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-brand-coral" aria-hidden />
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-2 lg:flex-1 lg:basis-0 lg:justify-end">
              <Link
                href="/search"
                className="p-2.5 hover:opacity-70 transition-opacity hidden sm:inline-flex"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px] text-brand-navy" strokeWidth={2} />
              </Link>
              <Link
                href="/account"
                className="p-2.5 hover:opacity-70 transition-opacity hidden sm:inline-flex"
                aria-label="Account"
              >
                <User className="h-[18px] w-[18px] text-brand-navy" strokeWidth={2} />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-[18px] w-[18px] text-brand-navy" strokeWidth={2} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-brand-coral text-[10px] font-bold text-white">
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
            className="absolute inset-0 bg-brand-navy/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background animate-slide-in-right flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center"
              >
                <span className="font-heading text-xl font-bold tracking-tight text-brand-navy">My Store</span>
                <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-brand-coral" aria-hidden />
              </Link>
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
                  className="block py-3.5 text-lg font-semibold border-b border-border/60 text-brand-navy hover:text-brand-coral transition-colors"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3.5 text-base text-brand-navy/70 hover:text-brand-coral transition-colors"
              >
                Search
              </Link>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3.5 text-base text-brand-navy/70 hover:text-brand-coral transition-colors"
              >
                Account
              </Link>
            </nav>
            <div className="p-5 border-t border-border">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-brand-navy text-white font-semibold py-3.5 rounded-pill text-sm hover:bg-brand-navy-dark transition-colors"
              >
                Shop everything
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
