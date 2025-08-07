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
import { saveBook } from '@/lib/libraryServices'
import type { Book } from '@/lib/db'
import { BookmarkPlus } from 'lucide-react'

const Home = () => {
  type GoogleBook = {
    id: string
    volumeInfo: {
      title: string
      authors?: string[]
      publisher?: string
      imageLinks: {
        smallThumbnail: string
      }
    }
  }
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GoogleBook[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/search-books', {
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

  const handleSave = (bookChoice: GoogleBook) => {
    const book: Book = {
      id: bookChoice.id,
      title: bookChoice.volumeInfo.title,
      authors: bookChoice.volumeInfo.authors || [],
      publisher: bookChoice.volumeInfo.publisher,
      thumbnail: bookChoice.volumeInfo.imageLinks?.smallThumbnail,
      createdAt: Date.now(),
    }
    saveBook(book)
    toast(`Added ${bookChoice.volumeInfo.title} to library!`)
  }

  return (
    <div className='flex w-full flex-col items-center justify-center px-4 pt-10'>
      <h1 className='mt-10 text-4xl font-bold uppercase italic text-shadow-lg'>
        The Library App
      </h1>
      <section className='mt-20'>
        <form onSubmit={handleSubmit}>
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
          {results.map((books) => {
            const info = books.volumeInfo
            return (
              <li key={books.id}>
                <Card className='h-full p-2'>
                  <CardHeader>
                    <CardAction className='relative top-0 flex w-full justify-end'>
                      <Button
                        onClick={() => handleSave(books)}
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

export default Home
