import { NextResponse } from 'next/server'

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
  let backendStatus: 'ok' | 'unreachable' = 'unreachable'

  try {
    const res = await fetch(`${backendUrl}/health`, { cache: 'no-store' })
    if (res.ok) backendStatus = 'ok'
  } catch {
    backendStatus = 'unreachable'
  }

  return NextResponse.json({
    status: 'ok',
    backendUrl,
    backendStatus,
    timestamp: new Date().toISOString(),
  })
}
