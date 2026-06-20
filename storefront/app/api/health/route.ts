import { NextResponse } from 'next/server'

const EXPECTED_SETTINGS = [
  'NODE_ENV',
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_STORE_ID',
  'NEXT_PUBLIC_MEDUSA_BACKEND_URL',
  'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY',
  'PORT',
] as const

export async function GET() {
  const settings = EXPECTED_SETTINGS.map((name) => ({
    name,
    present: Boolean(process.env[name]),
  }))
  const missing = settings.filter((s) => !s.present).map((s) => s.name)

  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

  if (!backendUrl) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured',
        configured: false,
        settings,
        missing,
      },
      { status: 500 },
    )
  }

  try {
    const url = new URL(backendUrl)
    if (!['http:', 'https:'].includes(url.protocol)) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'NEXT_PUBLIC_MEDUSA_BACKEND_URL must use http or https',
          configured: false,
          value: backendUrl,
          settings,
          missing,
        },
        { status: 500 },
      )
    }

    let reachable = false
    let backendStatus: number | null = null
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/health`, {
        method: 'GET',
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      })
      backendStatus = res.status
      reachable = res.ok
    } catch {
      reachable = false
    }

    return NextResponse.json(
      {
        status: reachable && missing.length === 0 ? 'ok' : 'degraded',
        configured: true,
        backendUrl: url.origin,
        backendReachable: reachable,
        backendStatus,
        settings,
        missing,
        timestamp: new Date().toISOString(),
      },
      { status: reachable ? 200 : 503 },
    )
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        message: 'NEXT_PUBLIC_MEDUSA_BACKEND_URL is not a valid URL',
        configured: false,
        value: backendUrl,
        settings,
        missing,
      },
      { status: 500 },
    )
  }
}
