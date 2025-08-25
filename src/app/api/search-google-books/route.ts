import { NextRequest, NextResponse } from 'next/server'
import { BookSearch } from '@/types/search'

/** Sends request to Google Books API */
export async function POST(req: NextRequest) {
  const body = await req.json()
  const filterObj = body.filters
  const {
    userBaseInput,
    userFineTuneInput,
    standardParameters,
    downloadable,
    digitalType,
    pageStartIndex,
    pageMaxResults,
    printType,
    projectionFull,
    orderBy,
  }: BookSearch = filterObj

  const userBaseInputCleaned = encodeURIComponent(userBaseInput)
  const standardParametersPlusFineTuneCleaned =
    userFineTuneInput !== ''
      ? `+${encodeURIComponent(standardParameters)}:${encodeURIComponent(userFineTuneInput)}`
      : ''
  const downloadableCleaned = downloadable ? '&download=epub' : ''
  const digitalTypeCleaned =
    digitalType === 'null' ? '' : `&filter=${encodeURIComponent(digitalType)}`
  const pageStartIndexCleaned = `&startIndex=${encodeURIComponent(pageStartIndex)}`
  const pageMaxResultsCleaned = `&maxResults=${encodeURIComponent(pageMaxResults)}`
  const printTypeCleaned = `&printType=${encodeURIComponent(printType)}`
  const projectionFullCleaned = `&projection=${projectionFull ? 'full' : 'lite'}`
  const orderByCleaned = `&orderBy=${encodeURIComponent(orderBy)}`

  const googleBaseUrl = `https://www.googleapis.com/books/v1/volumes?q=`
  const userFilters = `${userBaseInputCleaned}${standardParametersPlusFineTuneCleaned}${downloadableCleaned}${digitalTypeCleaned}${pageStartIndexCleaned}${pageMaxResultsCleaned}${printTypeCleaned}${projectionFullCleaned}${orderByCleaned}`
  const apiKey = `&key=${process.env.GOOGLE_BOOKS_API_KEY}`

  console.log(`${googleBaseUrl}${userFilters}`)
  const res = await fetch(`${googleBaseUrl}${userFilters}${apiKey}`)

  const data = await res.json()

  return NextResponse.json({ success: true, data })
}
