import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Star, CheckCircle2, Truck, RotateCcw, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react'
import { medusaServerClient } from '@/lib/medusa-client'
import ProductActions from '@/components/product/product-actions'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { type VariantExtension } from '@/components/product/product-price'
import DinkraProductDetail from '@/components/product/dinkra-product-detail'

export const revalidate = 3600

/* ─── Kit static data ────────────────────────────────────────────── */
const KIT_DATA: Record<string, {
  badge: string
  badgeColor: string
  tagline: string
  saveAmount: number
  comparePrice: number
  checklist: string[]
  otherKits: string[]
}> = {
  'starter-kit': {
    badge: 'Best Seller',
    badgeColor: 'bg-dinkra-gold text-dinkra-ink',
    tagline: 'Your first step on the court.',
    saveAmount: 15,
    comparePrice: 59,
    checklist: [
      '1× Fiberglass composite paddle (USAPA-approved, PP honeycomb core, 7.5–8.2 oz)',
      '4× Outdoor pickleballs (USAPA-approved)',
      '1× Replacement grip tape (cushioned, sweat-resistant)',
      '1× Dinkra branded drawstring bag',
      '1× Quick-start rules card',
    ],
    otherKits: ['rally-kit', 'gift-kit'],
  },
  'rally-kit': {
    badge: 'Most Popular',
    badgeColor: 'bg-dinkra-green text-white',
    tagline: 'Everything for two players, ready to go.',
    saveAmount: 20,
    comparePrice: 99,
    checklist: [
      '2× Fiberglass composite paddles (USAPA-approved)',
      '6× Outdoor pickleballs (USAPA-approved)',
      '2× Replacement grip tape',
      '1× Premium Dinkra zip bag',
      '1× Quick-start rules card',
    ],
    otherKits: ['starter-kit', 'gift-kit'],
  },
  'gift-kit': {
    badge: 'Gift Ready',
    badgeColor: 'bg-dinkra-gold text-dinkra-ink',
    tagline: 'The perfect gift for anyone active.',
    saveAmount: 25,
    comparePrice: 119,
    checklist: [
      '1× Fiberglass composite paddle (USAPA-approved)',
      '4× Outdoor pickleballs (USAPA-approved)',
      '1× Replacement grip tape',
      '1× Premium gift box with ribbon',
      '1× Handwritten gift card slot',
    ],
    otherKits: ['starter-kit', 'rally-kit'],
  },
}

const KIT_NAMES: Record<string, string> = {
  'starter-kit': 'Starter Kit',
  'rally-kit':   'Rally Kit',
  'gift-kit':    'Gift Kit',
}

const KIT_PRICES: Record<string, number> = {
  'starter-kit': 44,
  'rally-kit':   79,
  'gift-kit':    94,
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
