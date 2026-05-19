'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import CartDrawer from '@/components/cart/cart-drawer'

const NAV_LINKS = [
  { label: 'Prompt Packs', href: '/products' },
  { label: 'Categories',   href: '/collections' },
  { label: 'How It Works', href: '/about' },
  { label: 'Help',         href: '/faq' },
]

/* Inline logo mark — a small "unlock" key icon next to wordmark */
function LogoMark({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 7a4 4 0 1 0-4 4" />
      <path d="M10 11v10" />
      <path d="M7 17h6" />
    </svg>
  )
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  const navy = inverted ? 'text-white' : 'text-brand-navy'
  const coral = 'text-brand-coral'
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span className={`inline-flex items-center justify-center h-7 w-7 rounded-md ${inverted ? 'bg-white/10' : 'bg-brand-navy'}`}>
        <LogoMark className={`h-4 w-4 ${inverted ? 'text-brand-coral' : 'text-brand-coral'}`} />
      </span>
      <span className={`font-heading text-xl font-bold tracking-tight ${navy}`}>
        Career<span className={coral}>Unlocked</span>
      </span>
    </span>
  )
}

export { Logo }

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
            ? 'bg-background/90 backdrop-blur-md border-b border-border'
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

            {/* Logo (left on desktop) */}
            <Link href="/" className="flex items-center" prefetch={true}>
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
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

            {/* Right icons + CTA */}
            <div className="flex items-center gap-1 sm:gap-2">
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
              <Link
                href="/products"
                className="hidden lg:inline-flex items-center justify-center rounded-pill bg-brand-coral hover:bg-brand-coral-dark px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors ml-2"
              >
                Get the packs
              </Link>
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
                <Logo />
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
                className="block w-full text-center bg-brand-coral text-white font-semibold py-3.5 rounded-pill text-sm hover:bg-brand-coral-dark transition-colors"
              >
                Get the packs
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
