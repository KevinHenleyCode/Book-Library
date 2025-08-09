export type StandardParameters =
  | 'intitle'
  | 'inauthor'
  | 'inpublisher'
  | 'subject'
  | 'isbn'
  | 'lccn'
  | 'oclc'
export type DigitalType =
  | ''
  | 'partial'
  | 'full'
  | 'free-ebooks'
  | 'paid-ebooks'
  | 'ebooks'
export type PageMaxResults = 10 | 20 | 30 | 40
export type PrintType = 'all' | 'books' | 'magazines'
export type OrderBy = 'relevance' | 'newest'

export type BookSearch = {
  userInput: string
  standardParameters: StandardParameters
  downloadable: boolean
  digitalType: DigitalType
  pageStartIndex: number
  pageMaxResults: PageMaxResults
  printType: PrintType
  projectionFull: boolean
  orderBy: OrderBy
}
