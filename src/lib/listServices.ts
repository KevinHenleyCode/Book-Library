import { db } from '@/lib/db'
import type { BookList } from '@/types/list'
import type { ServiceReturn } from '@/types/return'

const now = () => Date.now()

/**
 * Makes sure there is always a userId applied to the table
 */
export async function checkRowExists(userId: string) {
  try {
    const row = await db.myLists.get(userId)

    if (!row) {
      const base: BookList = {
        userId,
        listNames: [],
        createdAt: now(),
        updatedAt: now(),
      }
      await db.myLists.put(base)
      return
    }

    return { success: true, message: 'Updated myLists table!', data: row }
  } catch (err) {
    return { success: false, message: `Error creating base row: ${err}` }
  }
}

/**
 * Retrieves all lists from myLists table
 */
export async function getAllListNames(): Promise<ServiceReturn<BookList[]>> {
  try {
    const allListNames = await db.myLists.orderBy('userId').toArray()
    return {
      success: true,
      message: 'Lists have been fetched.',
      data: allListNames,
    }
  } catch (err) {
    return { success: false, message: `Error fetching Lists: ${err}` }
  }
}

/**
 * Adds a new listName to myLists table
 */
export async function updateListNames(
  newName: string,
  userName: string,
): Promise<ServiceReturn> {
  try {
    const row = await db.myLists.get(userName)

    if (row) {
      const newLists = row.listNames?.includes(newName)
        ? row.listNames
        : [...(row.listNames ?? []), newName]

      await db.myLists.update(userName, {
        listNames: newLists,
        updatedAt: now(),
      })
      return {
        success: true,
        message: `Successfully added ${newName} to Lists.`,
        data: newLists,
      }
    } else {
      return { success: false, message: `Error with DataBase.` }
    }
  } catch (err) {
    return { success: false, message: `Error updating Lists: ${err}` }
  }
}
