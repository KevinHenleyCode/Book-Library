'use client'

import { useEffect, useState } from 'react'
import MyLibrarySearchResult from './myLibrarySearchResult'
import { getAllFromMyLibrary } from '@/lib/libraryServices'
import type { MyBookList } from '@/types/book'

const MyLibrarySearch = () => {
  const [books, setBooks] = useState<MyBookList>([])

  const handleGetAllFromMyLibrary = async () => {
    const { success, data } = await getAllFromMyLibrary()

    if (success) {
      setBooks(data ?? [])
    } else {
      setBooks([])
    }
  }

  useEffect(() => {
    handleGetAllFromMyLibrary()
  }, [])

  return (
    <div className='w-full'>
      <section></section>
      <MyLibrarySearchResult
        books={books}
        handleGetAllFromMyLibrary={handleGetAllFromMyLibrary}
      />
    </div>
  )
}

export default MyLibrarySearch
