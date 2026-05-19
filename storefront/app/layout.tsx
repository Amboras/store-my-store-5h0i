import './globals.css'
import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import { Providers } from './providers'
import { AnalyticsProvider } from '@/components/analytics-provider'
import { MetaPixelProvider } from '@/components/meta-pixel-provider'
import { Toaster } from 'sonner'
import { ElementPickerListener } from '@/components/element-picker-listener'
import { ErrorBoundary } from '@/components/error-boundary'
import dynamic from 'next/dynamic'

const CookieConsent = dynamic(() => import('@/components/cookie-consent'))

const heading = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Land the Job — 50 AI Prompts that Get You Callbacks',
  description:
    'Stop sending generic applications that get auto-rejected. 50 copy-paste ChatGPT prompts for resume, cover letter, LinkedIn, interview prep, and salary negotiation. Instant PDF — $27.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* PostHog cross-origin iframe recording shim — records DOM via rrweb and forwards
            events to the parent window (admin dashboard) for session replay. */}
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  'use strict';
  if (window.parent === window) return;
  var origin = window.location.origin;
  function startRecording() {
    var record = window.rrweb && window.rrweb.record;
    if (!record) return;
    record({
      emit: function(event) {
        try { window.parent.postMessage({ type: 'rrweb', event: event, origin: origin, isCheckout: event.type === 2 }, '*'); } catch(e) {}
      },
      collectFonts: true,
      sampling: { scroll: 150 }
    });
  }
  var s = document.createElement('script');
  s.src = 'https://unpkg.com/rrweb@2.0.0-alpha.20/dist/rrweb.umd.min.cjs';
  s.onload = startRecording;
  s.onerror = function() {
    var f = document.createElement('script');
    f.src = 'https://cdn.jsdelivr.net/npm/rrweb@2.0.0-alpha.20/dist/rrweb.umd.min.cjs';
    f.onload = startRecording;
    document.head.appendChild(f);
  };
  document.head.appendChild(s);
})();
        `}} />
      </head>
      <body className="bg-[#FAF7F2] text-[#0A0A0A] antialiased">
        <Providers>
          <ElementPickerListener />
          <main className="min-h-screen">
            <ErrorBoundary>
              <AnalyticsProvider>
                <MetaPixelProvider>
                  {children}
                </MetaPixelProvider>
              </AnalyticsProvider>
            </ErrorBoundary>
          </main>
          <CookieConsent />
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
