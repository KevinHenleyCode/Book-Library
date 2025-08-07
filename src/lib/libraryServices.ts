import { db, Book } from '@/lib/db'

/**
 * Adds book to the IndexedDB
 */
export async function saveBook(book: Book) {
  try {
    await db.books.put(book)
    console.log(`Saved "${book.title}"`)
  } catch (err) {
    console.error('Error saving book:', err)
  }
}

/**
 * Removes book from myLibrary Database
 */
export async function deleteBook(id: string): Promise<{ success: boolean }> {
  try {
    await db.books.delete(id)
    return { success: true }
  } catch {
    return { success: false }
  }
}

/**
 * Retrieves all books of a given parameter from Google Books API
 */
export async function getAllBooks(): Promise<Book[]> {
  return db.books.orderBy('createdAt').reverse().toArray()
}
