import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { medusaServerClient } from '@/lib/medusa-client'
import { type VariantExtension } from '@/components/product/product-price'
import DinkraProductDetail from '@/components/product/dinkra-product-detail'

export const revalidate = 3600

/* ─── Kit static data ────────────────────────────────────────────── */
const KIT_DATA: Record<string, {
  badge: string
  badgeStyle: 'solid' | 'outline'
  headline: string
  tagline: string
  saveAmount: number
  comparePrice: number
  reviewCount: number
  checklist: { qty: string; item: string; detail: string }[]
  infoBox: string
  freeShipping: boolean
  nudge?: string
  otherKits: string[]
}> = {
  'starter-kit': {
    badge: 'Best Seller',
    badgeStyle: 'solid',
    headline: 'Your first game starts here.',
    tagline: 'Everything you need to walk on court day one. Nothing you don\'t.',
    saveAmount: 15,
    comparePrice: 59,
    reviewCount: 127,
    checklist: [
      { qty: '1×', item: 'Carbon fiber paddle', detail: 'USAPA-approved, PP honeycomb core, 7.5–8.2oz' },
      { qty: '4×', item: 'Outdoor pickleballs', detail: 'USAPA-approved, built for hard courts' },
      { qty: '1×', item: 'Replacement grip tape', detail: 'Keep your hold fresh and firm' },
      { qty: '1×', item: 'Dinkra carry bag', detail: 'Carry everything, show up looking the part' },
      { qty: '1×', item: 'Quick-start rules card', detail: 'Learn the basics in 5 minutes' },
    ],
    infoBox: 'Everything ships together in one box. No assembly required. Court-ready the same day it arrives.',
    freeShipping: false,
    nudge: 'Add the Rally Kit and ship free — save $20 when you bundle',
    otherKits: ['rally-kit'],
  },
  'rally-kit': {
    badge: 'Most Popular',
    badgeStyle: 'outline',
    headline: 'Grab a partner. Get on the court.',
    tagline: 'Two players. One box. Zero excuses.',
    saveAmount: 20,
    comparePrice: 99,
    reviewCount: 98,
    checklist: [
      { qty: '2×', item: 'Carbon fiber paddles', detail: 'USAPA-approved, PP honeycomb core, 7.5–8.2oz' },
      { qty: '6×', item: 'Outdoor pickleballs', detail: 'USAPA-approved, built for hard courts' },
      { qty: '2×', item: 'Replacement grip tape', detail: 'One for each player' },
      { qty: '1×', item: 'Dinkra duffel bag', detail: 'Fits everything for two players' },
      { qty: '2×', item: 'Quick-start rules cards', detail: 'One for each player' },
    ],
    infoBox: 'Everything for two players in one box. Split it with a partner or give it as a gift. Ships same day.',
    freeShipping: true,
    otherKits: ['starter-kit'],
  },
}

const KIT_NAMES: Record<string, string> = {
  'starter-kit': 'The Starter Kit',
  'rally-kit':   'The Rally Kit',
}

const KIT_PRICES: Record<string, number> = {
  'starter-kit': 44,
  'rally-kit':   79,
}

/* ─── Data fetchers ──────────────────────────────────────────────── */
async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch {
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  const kitName = KIT_NAMES[handle] || (product?.title ?? 'Kit')
  const price = KIT_PRICES[handle]

  return {
    title: `${kitName} — Dinkra Pickleball`,
    description: product?.description ||
      `The Dinkra ${kitName}${price ? ` — $${price}` : ''}. Everything you need to start playing pickleball today.`,
  }
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) notFound()

  const variantExtensions = await getVariantExtensions(product.id)
  const kitExtra = KIT_DATA[handle]

  return (
    <DinkraProductDetail
      product={product}
      variantExtensions={variantExtensions}
      handle={handle}
      kitExtra={kitExtra}
    />
  )
}
