import { NextRequest, NextResponse } from 'next/server'
import { BookSearch } from '@/types/search'

/** Sends request to Google Books API */
export async function POST(req: NextRequest) {
  const body = await req.json()
  const filterObj = body.filters
  const {
    userInput,
    standardParameters,
    downloadable,
    digitalType,
    pageStartIndex,
    pageMaxResults,
    printType,
    projectionFull,
    orderBy,
  }: BookSearch = filterObj

  const standardParametersCleaned = `${encodeURIComponent(standardParameters)}:`
  const userInputCleaned = encodeURIComponent(userInput)
  const downloadableCleaned = downloadable ? '&download=epub' : ''
  const digitalTypeCleaned =
    digitalType === '' ? '' : `&filter=${encodeURIComponent(digitalType)}`
  const pageStartIndexCleaned = `&startIndex=${encodeURIComponent(pageStartIndex)}`
  const pageMaxResultsCleaned = `&maxResults=${encodeURIComponent(pageMaxResults)}`
  const printTypeCleaned = `&printType=${encodeURIComponent(printType)}`
  const projectionFullCleaned = `&projection=${projectionFull ? 'full' : 'lite'}`
  const orderByCleaned = `&orderBy=${encodeURIComponent(orderBy)}`

  const googleBaseUrl = `https://www.googleapis.com/books/v1/volumes?q=`
  const userFilters = `${standardParametersCleaned}${userInputCleaned}${downloadableCleaned}${digitalTypeCleaned}${pageStartIndexCleaned}${pageMaxResultsCleaned}${printTypeCleaned}${projectionFullCleaned}${orderByCleaned}`
  const apiKey = `&key=${process.env.GOOGLE_BOOKS_API_KEY}`

  const res = await fetch(`${googleBaseUrl}${userFilters}${apiKey}`)

  const data = await res.json()

  return NextResponse.json({ success: true, data })
}
