import { db } from '@/lib/db'
import type { BookList } from '@/types/list'
import type { ServiceReturn } from '@/types/return'

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
