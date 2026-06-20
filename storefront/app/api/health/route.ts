import { NextResponse } from 'next/server'

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_MEDUSA_BACKEND_URL',
  'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY',
] as const

const OPTIONAL_ENV_VARS = [
  'NEXT_PUBLIC_STORE_ID',
  'NEXT_PUBLIC_ANALYTICS_ENDPOINT',
  'PORT',
] as const

export async function GET() {
  const required = REQUIRED_ENV_VARS.map((name) => ({
    name,
    configured: Boolean(process.env[name]),
  }))

  const optional = OPTIONAL_ENV_VARS.map((name) => ({
    name,
    configured: Boolean(process.env[name]),
  }))

  const missing = required.filter((v) => !v.configured).map((v) => v.name)
  const healthy = missing.length === 0

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'misconfigured',
      healthy,
      timestamp: new Date().toISOString(),
      env: {
        required,
        optional,
        missing,
      },
    },
    { status: healthy ? 200 : 503 },
  )
}
