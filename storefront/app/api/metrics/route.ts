import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.METRICS_SERVICE_URL || 'http://localhost:9000'

  try {
    const response = await fetch(`${baseUrl}/v1/config`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch metrics' },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
