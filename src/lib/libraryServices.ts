import { db } from '@/lib/db'
import type { MyBook } from '@/types/book'

type ServiceReturn<T = unknown[]> = {
  success: boolean
  message: string
  data?: T
}

/**
 * Adds book to the IndexedDB
 */
export async function saveToMyLibrary(myBook: MyBook): Promise<ServiceReturn> {
  try {
    await db.myLibrary.put(myBook)
    return { success: true, message: `Added ${myBook.title} to library!` }
  } catch (err) {
    return {
      success: false,
      message: `There was an error saving your book: ${err}`,
    }
  }
}

/**
 * Removes book from myLibrary Database
 */
export async function deleteFromMyLibrary(
  id: string,
  title: string,
): Promise<ServiceReturn> {
  try {
    await db.myLibrary.delete(id)
    return { success: true, message: `Removed ${title} from library.` }
  } catch (err) {
    return {
      success: false,
      message: `There was an error removing your book: ${err}`,
    }
  }
}

/**
 * Retrieves all books of a given parameter from Google Books API
 */
export async function getAllFromMyLibrary(): Promise<ServiceReturn<MyBook[]>> {
  const allMyBooks = await db.myLibrary.orderBy('createdAt').reverse().toArray()
  try {
    return {
      success: true,
      message: 'Retrieved all books!',
      data: allMyBooks,
    }
  } catch (err) {
    return {
      success: false,
      message: `There was an error fetching your books: ${err}`,
    }
  }
}
