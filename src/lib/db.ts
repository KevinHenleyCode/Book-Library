import Dexie, { Table } from 'dexie'

export interface Book {
  id: string // Google Books ID
  title: string
  authors: string[]
  thumbnail?: string
  publisher?: string
  createdAt: number
}

class MyLibraryDB extends Dexie {
  books!: Table<Book>

  constructor() {
    super('myLibrary')
    this.version(1).stores({
      books: 'id, title, createdAt',
    })
  }
}

export const db = new MyLibraryDB()
