import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { query } = await req.json()
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY
  const url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:'
  const keyHolder = '&key='

  const res = await fetch(
    `${url}${encodeURIComponent(query)}${keyHolder}${apiKey}`,
  )

  const data = await res.json()

  return NextResponse.json({ success: true, data })
}
