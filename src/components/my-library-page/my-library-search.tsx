'use client'

import { useEffect, useState, useCallback } from 'react'
import MyLibrarySearchResult from './my-library-search-result'
import { getBooksFromMyLibrary } from '@/lib/libraryServices'
import type { MyBookList } from '@/types/book'
import { Separator } from '@/components/ui/separator'
import MyLibraryFilter from './my-library-filter'

/**
 * Container for the search and results of My Library
 */
const MyLibrarySearch = () => {
  const [books, setBooks] = useState<MyBookList>([])
  const [listName, setListName] = useState<string>('All Books')

  const handleGetBooksFromMyLibrary = useCallback(async () => {
    const { success, data } = await getBooksFromMyLibrary(listName)

    if (success) {
      setBooks(data ?? [])
    } else {
      setBooks([])
    }
  }, [listName])

  useEffect(() => {
    handleGetBooksFromMyLibrary()
  }, [handleGetBooksFromMyLibrary, listName])

  return (
    <div className='my-10 w-full'>
      <MyLibraryFilter listName={listName} setListName={setListName} />
      <Separator className='mt-10' />
      <MyLibrarySearchResult
        books={books}
        handleGetBooksFromMyLibrary={handleGetBooksFromMyLibrary}
      />
    </div>
  )
}

export default MyLibrarySearch
