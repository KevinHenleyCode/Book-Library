export type GoogleBook = {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    publisher?: string
    imageLinks: {
      smallThumbnail: string
    }
  }
}

export interface MyBook {
  id: string // Google Books ID
  title: string
  authors: string[]
  thumbnail?: string
  publisher?: string
  createdAt: number
}
