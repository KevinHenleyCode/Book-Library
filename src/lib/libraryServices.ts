import { db, Book } from '@/lib/db'

export async function saveBook(book: Book) {
  try {
    await db.books.put(book)
    console.log(`Saved "${book.title}"`)
  } catch (err) {
    console.error('Error saving book:', err)
  }
}

export async function deleteBook(book: Book) {
  try {
    await db.books.delete(book.id)
    console.log(`Removed "${book.title}"`)
  } catch (err) {
    console.error('Error removing book:', err)
  }
}

export async function getAllBooks(): Promise<Book[]> {
  return db.books.orderBy('createdAt').reverse().toArray()
}
