'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getAllBooks } from '@/lib/libraryServices'
import type { Book } from '@/lib/db'
import { Trash2 } from 'lucide-react'

const Library = () => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    getAllBooks().then(setBooks)
  }, [])
  return (
    <section className='mt-10 flex w-full justify-center px-4'>
      <ul className='3xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-9 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Card className='h-full'>
                <CardHeader>
                  <CardAction className='relative top-0 flex w-full justify-end'>
                    <Button
                      // onClick={() => handleSave(books)}
                      variant={'secondary'}
                      className='absolute -right-4 hover:cursor-pointer'
                    >
                      <Trash2 />
                    </Button>
                  </CardAction>
                  <CardContent className='flex justify-center'>
                    {book?.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        width={100}
                        height={100}
                        className='rounded-sm shadow-md shadow-black'
                      />
                    ) : null}
                  </CardContent>
                  <CardTitle className='text-center text-xl'>
                    {book.title}
                  </CardTitle>
                  <CardContent className='text-md text-center'>
                    {book.authors}
                  </CardContent>
                </CardHeader>
              </Card>
            </li>
          )
        }) || []}
      </ul>
    </section>
  )
}

export default Library
