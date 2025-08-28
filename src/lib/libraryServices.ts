import { db } from '@/lib/db'
import type { MyBook } from '@/types/book'
import type { ServiceReturn } from '@/types/return'

/**
 * Retrieves all books of a given parameter from myLibrary
 */
export async function getBooksFromMyLibrary(
  listName: string,
): Promise<ServiceReturn<MyBook[]>> {
  try {
    let allBooksFromList: MyBook[] = []
    if (listName === 'All Books') {
      allBooksFromList = await db.myLibrary
        .orderBy('createdAt')
        .reverse()
        .toArray()
    } else {
      allBooksFromList = await db.myLibrary
        .where('lists')
        .equals(listName)
        .toArray()
    }
    return {
      success: true,
      message: 'Retrieved all books!',
      data: allBooksFromList,
    }
  } catch (err) {
    return {
      success: false,
      message: `There was an error fetching your books: ${err}`,
    }
  }
}

/**
 * Checks using ID to see if it exists in myLibrary
 */
export async function isBookInMyLibrary(id: string): Promise<boolean> {
  try {
    const book = await db.myLibrary.get(id)
    return !!book
  } catch (err) {
    console.log(`Issue checking status of book: ${err}`)
    return false
  }
}

/**
 * Adds book to the IndexedDB
 */
export async function saveToMyLibrary(myBook: MyBook): Promise<ServiceReturn> {
  try {
    await db.myLibrary.put(myBook)
    return { success: true, message: `Updated ${myBook.title} in My Library!` }
  } catch (err) {
    return {
      success: false,
      message: `There was an error saving your book: ${err}`,
    }
  }
}

/**
 * Gets all lists a book has been added to
 */
export async function getAllLists(
  id: string,
): Promise<ServiceReturn<string[]>> {
  try {
    const bookInMyLibrary = await db.myLibrary.get(id)
    if (!bookInMyLibrary) {
      return { success: false, message: `Book not in myLibrary` }
    }
    return {
      success: true,
      message: 'Got all lists for book!',
      data: bookInMyLibrary.lists ?? [],
    }
  } catch (err) {
    return { success: false, message: `Couldn't get all lists: ${err}` }
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
