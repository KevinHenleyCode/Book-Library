export type GoogleBook = {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate: string
    description: string
    industryIdentifiers?: [
      {
        type?: string
        identifier?: string
      },
    ]
    readingModes?: {
      text?: boolean
      image?: boolean
    }
    pageCount: number
    printType?: string
    categories: string[]
    averageRating?: number
    ratingsCount?: number
    maturityRating?: string
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
    language?: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
  }
  saleInfo?: {
    country?: string
    saleability?: string
    isEbook?: boolean
    listPrice?: {
      amount?: number
      currencyCode?: string
    }
    retailPrice?: {
      amount?: number
      currencyCode?: string
    }
    buyLink?: string
  }
  accessInfo?: {
    country?: string
    viewability?: string
    publicDomain?: boolean
    textToSpeechPermission?: string
    epub?: {
      isAvailable?: boolean
      acsTokenLink?: string
    }
    pdf?: {
      isAvailable?: boolean
      acsTokenLink?: string
    }
    webReaderLink?: string
    accessViewStatus?: string
    quoteSharingAllowed?: boolean
  }
  searchInfo?: {
    textSnippet?: string
  }
}

export type GoogleBookList = GoogleBook[]

export interface MyBook {
  id: string // Google Books ID
  kind: string
  etag: string
  selfLink: string
  title: string
  subTitle?: string
  authors?: string[]
  publisher?: string
  publishedDate?: string
  description: string
  industryIdentifiers?: [
    {
      type?: string
      identifier?: string
    },
  ]
  readingModesText?: boolean
  readingModesImage?: boolean
  pageCount: number
  printType?: string
  categories: string[]
  averageRating?: number
  ratingsCount?: number
  maturityRating?: string
  imageLinksSmallThumbnail: string
  imageLinksThumbnail: string
  language?: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  saleInfoCountry?: string
  saleInfoSaleability?: string
  saleInfoIsEbook?: boolean
  saleInfoListPriceAmount?: number
  saleInfoListPriceCurrencyCode?: string
  saleInfoRetailPriceAmount?: number
  saleInfoRetailPriceCurrencyCode?: string
  saleInfoBuyLink?: string
  accessInfoCountry?: string
  accessInfoViewability?: string
  accessInfoPublicDomain?: boolean
  accessInfoTextToSpeechPermission?: string
  accessInfoEpubIsAvailable?: boolean
  accessInfoEpubIsAcsTokenLink?: string
  accessInfoPdfIsAvailable?: boolean
  accessInfoPdfIsAcsTokenLink?: string
  accessInfoWebReaderLink?: string
  accessInfoAccessViewStatus?: string
  accessInfoQuoteSharingAllowed?: boolean
  searchInfoTextSnippet?: string
  lists: string[]
  createdAt: number
  updatedAt: number
  deletedAt: number | null
}

export type MyBookList = MyBook[]
