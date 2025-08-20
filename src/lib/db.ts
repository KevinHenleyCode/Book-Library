import Dexie, { Table } from 'dexie'
import type { MyBook } from '@/types/book'
import type { BookList } from '@/types/list'

class TheLibraryDB extends Dexie {
  myLibrary!: Table<MyBook>
  myLists!: Table<BookList>

  constructor() {
    super('theLibrary')
    this.version(1).stores({
      myLibrary: 'id, title, *lists, updatedAt, deletedAt',
      myLists: 'userId, *listNames, updatedAt',
    })
  }
}

export const db = new TheLibraryDB()
