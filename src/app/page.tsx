'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { saveToMyLibrary } from '@/lib/libraryServices'
import { BookmarkPlus } from 'lucide-react'
import type { GoogleBook, MyBook } from '@/types/book'

const HomePage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GoogleBook[]>([])

  const handleSearchGoogleBooks = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/search-google-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const result = await res.json()

      setResults(result.data.items)
    } catch (err) {
      console.error(`Search Error: ${err}`)
    }
  }

  const handleSaveToMyLibrary = async (googleBook: GoogleBook) => {
    try {
      const myBook: MyBook = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        authors: googleBook.volumeInfo.authors || [],
        publisher: googleBook.volumeInfo.publisher,
        thumbnail: googleBook.volumeInfo.imageLinks?.smallThumbnail,
        createdAt: Date.now(),
      }
      const { success, message } = await saveToMyLibrary(myBook)
      if (success) {
        toast(message)
      } else {
        console.error(message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center px-4 pt-10'>
      <h1 className='mt-10 text-4xl font-bold uppercase italic text-shadow-lg'>
        The Library App
      </h1>
      <section className='mt-20'>
        <form onSubmit={handleSearchGoogleBooks}>
          <div className='flex w-full items-center justify-around gap-2'>
            <Input
              type='text'
              placeholder='Search Here'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-52 sm:w-72'
            />
            <Button className='w-1/4' type='submit'>
              Search
            </Button>
          </div>
        </form>
      </section>
      <section className='mt-10 flex w-full justify-center'>
        <ul className='3xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-9 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {results.map((book) => {
            const info = book.volumeInfo
            return (
              <li key={book.id}>
                <Card className='h-full p-2'>
                  <CardHeader>
                    <CardAction className='relative top-0 flex w-full justify-end'>
                      <Button
                        onClick={() => handleSaveToMyLibrary(book)}
                        variant={'secondary'}
                        className='hover:text-chart-2 absolute -right-4 transition-all duration-200 ease-in-out hover:cursor-pointer'
                      >
                        <BookmarkPlus />
                      </Button>
                    </CardAction>
                    <CardContent className='flex justify-center'>
                      {info?.imageLinks ? (
                        <Image
                          src={info.imageLinks.smallThumbnail}
                          alt={info.title}
                          width={100}
                          height={100}
                          className='rounded-sm shadow-md shadow-black'
                        />
                      ) : null}
                    </CardContent>
                    <CardTitle className='text-center text-xl'>
                      {info.title}
                    </CardTitle>
                    <CardContent className='text-md text-center'>
                      {info.authors}
                    </CardContent>
                  </CardHeader>
                </Card>
              </li>
            )
          }) || []}
        </ul>
      </section>
    </div>
  )
}

export default HomePage
