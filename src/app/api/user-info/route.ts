import { NextResponse } from 'next/server'

/**
 * Gets user name from .env
 */
export async function GET() {
  const userName = process.env.USER_NAME
  return NextResponse.json({ success: true, userName })
}
