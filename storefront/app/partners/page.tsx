export const metadata = {
  title: 'Partners',
  description: 'Partner with us to grow together.',
}

export default function PartnersPage() {
  return (
    <main className="container-custom py-24">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Collaborate with us
        </p>
        <h1 className="text-display font-heading mb-6 text-balance">Partners</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          We welcome partners who share our values and want to collaborate. Whether
          you&apos;re a creator, retailer, or brand, we&apos;d love to hear from you.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Reach out through our contact page and tell us a bit about yourself —
          we&apos;ll get back to you soon.
        </p>
        <a
          href="/contact"
          className="inline-block mt-8 px-6 py-3 bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </main>
  )
}
