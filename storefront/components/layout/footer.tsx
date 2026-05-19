'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'

/* ─── Social icons (inline — lucide does not ship branded icons) ── */
function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TikTokIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.27 8.27 0 004.84 1.55V7a4.85 4.85 0 01-1.07-.31z" />
    </svg>
  )
}

function XIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="bg-brand-navy text-white mt-20">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="container-custom py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight">
                Get on the list.
              </h3>
              <p className="mt-3 text-white/65 text-base max-w-md">
                Early access to new drops, occasional notes, and 10% off your first order.
                No spam — we promise.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
              {submitted ? (
                <div className="rounded-pill bg-white/10 px-6 py-4 text-sm text-white/85">
                  Thanks — check your inbox for your welcome code.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-pill bg-white/8 border border-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-coral focus:bg-white/12 transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand-coral hover:bg-brand-coral-dark px-7 py-3.5 text-sm font-semibold text-white transition-colors"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-custom py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-5">
              <span className="font-heading text-2xl font-bold tracking-tight text-white">My Store</span>
              <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-brand-coral" aria-hidden />
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              Modern goods, chosen with intention. Made to be lived with.
            </p>
            <div className="flex gap-2 mt-6">
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-brand-coral transition-colors"
                 aria-label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-brand-coral transition-colors"
                 aria-label="TikTok">
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-brand-coral transition-colors"
                 aria-label="X">
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-5">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All products', href: '/products' },
                { label: 'Collections',  href: '/collections' },
                { label: 'New arrivals', href: '/products?sort=newest' },
                { label: 'Best sellers', href: '/products' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-5">Help</h4>
            <ul className="space-y-3">
              {[
                { label: 'Shipping',  href: '/shipping' },
                { label: 'Returns',   href: '/shipping' },
                { label: 'FAQ',       href: '/faq' },
                { label: 'Contact',   href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About',   href: '/about' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms',   href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} My Store. All rights reserved.
          </p>
          <button
            onClick={() => {
              clearConsent()
              window.dispatchEvent(new Event('manage-cookies'))
            }}
            className="text-xs text-white/35 hover:text-white/65 transition-colors"
          >
            Manage cookies
          </button>
        </div>
      </div>
    </footer>
  )
}
