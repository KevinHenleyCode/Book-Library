import Dexie, { Table } from 'dexie'
import type { MyBook } from '@/types/book'

class TheLibraryDB extends Dexie {
  myLibrary!: Table<MyBook>

  constructor() {
    super('theLibrary')
    this.version(1).stores({
      myLibrary: 'id, title, lists, createdAt',
    })
  }
}

export const db = new TheLibraryDB()
