'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'

/* ─── Social icons (inline — lucide does not ship branded icons) ── */
function LinkedInIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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

function YouTubeIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function LogoMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 7a4 4 0 1 0-4 4" />
      <path d="M10 11v10" />
      <path d="M7 17h6" />
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
                Get a free starter pack.
              </h3>
              <p className="mt-3 text-white/65 text-base max-w-md">
                Drop your email and we&apos;ll send 12 of our highest-performing AI prompts for job search, plus an
                exclusive 15% off your first pack.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
              {submitted ? (
                <div className="rounded-pill bg-white/10 px-6 py-4 text-sm text-white/85">
                  Thanks — your starter pack is on the way. Check your inbox in a minute.
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
                    Send it
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
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-white/10">
                <LogoMark className="h-4 w-4 text-brand-coral" />
              </span>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Career<span className="text-brand-coral">Unlocked</span>
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              Battle-tested AI prompt packs that move your career forward. Built by recruiters,
              tested by thousands.
            </p>
            <div className="flex gap-2 mt-6">
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-brand-coral transition-colors"
                 aria-label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-brand-coral transition-colors"
                 aria-label="X">
                <XIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-brand-coral transition-colors"
                 aria-label="YouTube">
                <YouTubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Packs */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-5">Packs</h4>
            <ul className="space-y-3">
              {[
                { label: 'All prompt packs', href: '/products' },
                { label: 'Categories',       href: '/collections' },
                { label: 'New releases',     href: '/products?sort=newest' },
                { label: 'Best sellers',     href: '/products' },
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
                { label: 'How it works',  href: '/about' },
                { label: 'Refund policy', href: '/shipping' },
                { label: 'FAQ',           href: '/faq' },
                { label: 'Contact',       href: '/contact' },
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
            &copy; 2026 CareerUnlocked. All rights reserved.
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
