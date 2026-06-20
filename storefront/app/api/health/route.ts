import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const startTime = Date.now()

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  let backendOk = false

  if (backendUrl) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)
      const res = await fetch(`${backendUrl}/health`, {
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      backendOk = res.ok
    } catch {
      backendOk = false
    }
  }

  return NextResponse.json({
    status: backendOk ? 'ok' : 'degraded',
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    environment: process.env.NODE_ENV ?? 'unknown',
    backendConnected: backendOk,
    timestamp: new Date().toISOString(),
  })
}
