'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { getAllBooks } from '@/lib/libraryServices'
import type { Book } from '@/lib/db'

const WishList = () => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    getAllBooks().then(setBooks)
  }, [])
  return (
    <section className='mt-10 flex w-full justify-center'>
      <ul className='grid w-5/6 grid-cols-3 gap-4'>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Card className='h-full'>
                <CardHeader>
                  <CardTitle className='text-2xl'>{book.title}</CardTitle>
                  <CardContent className='text-lg'>
                    <p>{book.publisher}</p>
                  </CardContent>
                  <div className='mt-2 flex w-full justify-center'>
                    {book?.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        width={100}
                        height={100}
                        className='rounded-sm shadow-md shadow-black'
                      />
                    ) : null}
                  </div>
                </CardHeader>
              </Card>
            </li>
          )
        }) || []}
      </ul>
    </section>
  )
}

export default WishList
