'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/cookie-consent'

/* ─── Social icons ───────────────────────────────────────────────── */
function TikTokIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.27 8.27 0 004.84 1.55V7a4.85 4.85 0 01-1.07-.31z" />
    </svg>
  )
}

function InstagramIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-dinkra-ink text-white">
      <div className="container-custom py-14 lg:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col items-start leading-none mb-4">
              <span className="font-heading text-3xl tracking-wider text-dinkra-green">DINKRA</span>
              <span className="font-body text-[8px] font-semibold tracking-[0.3em] uppercase text-white/60 -mt-0.5">
                PICKLEBALL
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mt-4">
              Built for your first rally.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://tiktok.com/@dinkrapickleball"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-dinkra-green transition-colors"
                aria-label="TikTok @dinkrapickleball"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/dinkrapickleball"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-dinkra-green transition-colors"
                aria-label="Instagram @dinkrapickleball"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: 'Starter Kit',  href: '/products/starter-kit' },
                { label: 'Rally Kit',    href: '/products/rally-kit' },
                { label: 'Gift Kit',     href: '/products/gift-kit' },
                { label: 'All Products', href: '/products' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Support</h3>
            <ul className="space-y-3">
              {[
                { label: 'Shipping',  href: '/shipping' },
                { label: 'Returns',   href: '/refund-policy' },
                { label: 'FAQ',       href: '/faq' },
                { label: 'Contact',   href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Get in Touch</h3>
            <a
              href="mailto:support@dinkrapickleball.com"
              className="text-sm text-white/60 hover:text-white transition-colors break-all"
            >
              support@dinkrapickleball.com
            </a>
            <div className="mt-5 space-y-2">
              <p className="text-xs text-white/35">@dinkrapickleball</p>
              <p className="text-xs text-white/35">TikTok · Instagram</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Dinkra Pickleball. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms
            </Link>
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Manage Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
