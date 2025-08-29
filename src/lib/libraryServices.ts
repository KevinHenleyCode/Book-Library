import { db } from '@/lib/db'
import type { MyBook, GoogleBook } from '@/types/book'
import type { ServiceReturn } from '@/types/return'
import { deleteListName } from './listServices'

const now = () => Date.now()

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
        .filter((book) => !book.deletedAt)
        .toArray()
    } else {
      allBooksFromList = await db.myLibrary
        .where('lists')
        .equals(listName)
        .filter((book) => !book.deletedAt)
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
 * Adds book to the IndexedDB
 */
export async function saveToMyLibrary(myBook: MyBook): Promise<ServiceReturn> {
  try {
    await db.myLibrary.put(myBook)
    return { success: true, message: `Saved ${myBook.title} in My Library!` }
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
export async function deleteBookFromMyLibrary(
  id: string,
  title: string,
): Promise<ServiceReturn> {
  try {
    // await db.myLibrary.delete(id)
    await db.myLibrary.update(id, { lists: [] })
    await db.myLibrary.update(id, { deletedAt: now() })
    return { success: true, message: `Removed ${title} from library.` }
  } catch (err) {
    return {
      success: false,
      message: `There was an error removing your book: ${err}`,
    }
  }
}

/**
 * Checks using ID to see if it exists in myLibrary
 */
export async function isBookInMyLibrary(id: string): Promise<boolean> {
  try {
    const book = await db.myLibrary.get({ id, deletedAt: 0 })
    return !!book
  } catch (err) {
    console.log(`Issue checking status of book: ${err}`)
    return false
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
 * Updates lists of a book already in myLibrary
 */
export async function updateTheBooksLists(
  myBook: GoogleBook,
  updatedLists: string[],
): Promise<ServiceReturn> {
  try {
    await db.myLibrary.update(myBook.id, {
      lists: updatedLists,
      updatedAt: now(),
    })
    return {
      success: true,
      message: `Updated ${myBook.volumeInfo.title} in My Library!`,
    }
  } catch (err) {
    return {
      success: false,
      message: `There was an error updating your book: ${err}`,
    }
  }
}

/**
 * Deletes a list from books already in myLibrary
 */
export async function deleteThisListFromBooks(
  userName: string,
  currentList: string,
): Promise<ServiceReturn> {
  try {
    const booksWithThisList = await db.myLibrary
      .where('lists')
      .equals(currentList)
      .toArray()

    await Promise.all(
      booksWithThisList.map((book) =>
        db.myLibrary.update(book.id, {
          lists: book.lists.filter((l) => l !== currentList),
          updatedAt: now(),
        }),
      ),
    )

    const { success } = await deleteListName(userName, currentList)

    return {
      success: success,
      message: `Deleted ${currentList} from Library!`,
    }
  } catch (err) {
    return {
      success: false,
      message: `There was an error deleting your list: ${err}`,
    }
  }
}
