import { db } from '@/lib/db'
import type { BookList } from '@/types/list'
import type { ServiceReturn } from '@/types/return'

const userId = 'local-user'
const now = () => Date.now()

/**
 * Makes sure there is always a userId applied to the table
 */
export async function checkRowExists() {
  try {
    const row = await db.myLists.get(userId)

    if (!row) {
      const base: BookList = {
        userId,
        listNames: ['Default'],
        createdAt: now(),
        updatedAt: now(),
      }
      await db.myLists.put(base)
      return base
    }

    if (!row.listNames.includes('Default')) {
      const updated: BookList = {
        ...row,
        listNames: [...row.listNames, 'default'],
        updatedAt: now(),
      }
      await db.myLists.put(updated)
      return updated
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
    const allListNames = await db.myLists.orderBy('listNames').toArray()
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
export async function updateListNames(name: string): Promise<ServiceReturn> {
  try {
    const row = await db.myLists.get(userId)

    if (row) {
      const newLists = row.listNames?.includes(name)
        ? row.listNames
        : [...(row.listNames ?? []), name]

      await db.myLists.update(userId, { listNames: newLists, updatedAt: now() })
      return {
        success: true,
        message: `Successfully added ${name} to Lists.`,
        data: newLists,
      }
    } else {
      return { success: false, message: `Error with DataBase.` }
    }
  } catch (err) {
    return { success: false, message: `Error updating Lists: ${err}` }
  }
}
