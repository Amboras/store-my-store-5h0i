import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

  if (!backendUrl) {
    return NextResponse.json(
      { ok: false, error: 'Backend URL not configured' },
      { status: 500 },
    )
  }

  const startedAt = Date.now()

  try {
    const res = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      latencyMs: Date.now() - startedAt,
    })
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Request failed',
        latencyMs: Date.now() - startedAt,
      },
      { status: 502 },
    )
  }
}
