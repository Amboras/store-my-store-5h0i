import { NextResponse } from 'next/server'

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

  if (!backendUrl) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured',
        configured: false,
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
        status: reachable ? 'ok' : 'degraded',
        configured: true,
        backendUrl: url.origin,
        backendReachable: reachable,
        backendStatus,
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
      },
      { status: 500 },
    )
  }
}
