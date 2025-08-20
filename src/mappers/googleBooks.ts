import type { GoogleBook, MyBook } from '@/types/book'

/**
 * Maps data coming from Google Books to My Books
 */
export function mapGoogleBookToMyBook(g: GoogleBook): MyBook {
  const v = g.volumeInfo
  const sa = g.saleInfo
  const a = g.accessInfo
  const se = g.searchInfo

  return {
    // Base info
    id: g.id,
    kind: g.kind,
    etag: g.etag,
    selfLink: g.selfLink,

    // Volume info
    title: v.title,
    subTitle: v.subtitle ?? '',
    authors: v.authors ?? [],
    publisher: v.publisher ?? 'UNKNOWN',
    publishedDate: v.publishedDate ?? 'UNKNOWN',
    description: v.description,
    industryIdentifiers: v.industryIdentifiers ?? [{}],
    readingModesText: v.readingModes?.text ?? false,
    readingModesImage: v.readingModes?.image ?? false,
    pageCount: v.pageCount ?? 0,
    printType: v.printType ?? 'UNKNOWN',
    categories: v.categories ?? [],
    averageRating: v.averageRating ?? 0,
    ratingsCount: v.ratingsCount ?? 0,
    maturityRating: v.maturityRating ?? 'UNKNOWN',
    imageLinksSmallThumbnail: v.imageLinks.smallThumbnail ?? '',
    imageLinksThumbnail: v.imageLinks.thumbnail ?? '',
    language: v.language ?? 'UNKNOWN',
    previewLink: v.previewLink ?? '',
    infoLink: v.infoLink ?? '',
    canonicalVolumeLink: v.canonicalVolumeLink ?? '',

    // Sale info
    saleInfoCountry: sa?.country ?? 'UNKNOWN',
    saleInfoSaleability: sa?.saleability ?? 'UNKNOWN',
    saleInfoIsEbook: sa?.isEbook ?? false,
    saleInfoListPriceAmount: sa?.listPrice?.amount ?? 0,
    saleInfoListPriceCurrencyCode: sa?.listPrice?.currencyCode ?? 'UNKNOWN',
    saleInfoRetailPriceAmount: sa?.retailPrice?.amount ?? 0,
    saleInfoRetailPriceCurrencyCode: sa?.retailPrice?.currencyCode ?? 'UNKNOWN',
    saleInfoBuyLink: sa?.buyLink ?? '',

    // Access info
    accessInfoCountry: a?.country ?? 'UNKNOWN',
    accessInfoViewability: a?.viewability ?? 'UNKNOWN',
    accessInfoPublicDomain: a?.publicDomain ?? false,
    accessInfoTextToSpeechPermission: a?.textToSpeechPermission ?? 'UNKNOWN',
    accessInfoEpubIsAvailable: a?.epub?.isAvailable ?? false,
    accessInfoEpubIsAcsTokenLink: a?.epub?.acsTokenLink ?? 'UNKNOWN',
    accessInfoPdfIsAvailable: a?.pdf?.isAvailable ?? false,
    accessInfoPdfIsAcsTokenLink: a?.pdf?.acsTokenLink ?? 'UNKNOWN',
    accessInfoWebReaderLink: a?.webReaderLink ?? 'UNKNOWN',
    accessInfoAccessViewStatus: a?.accessViewStatus ?? 'UNKNOWN',
    accessInfoQuoteSharingAllowed: a?.quoteSharingAllowed ?? false,

    // Search info
    searchInfoTextSnippet: se?.textSnippet ?? 'UNKNOWN',

    // List info
    lists: ['default'],

    // Created At info
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  } as const
}
