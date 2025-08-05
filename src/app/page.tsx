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
import { useTheme } from 'next-themes'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs'
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
  const [themeBtn, setThemeBtn] = useState(true)

  const { setTheme } = useTheme()

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

  const themeToggle = (theme: boolean) => {
    setThemeBtn(!themeBtn)
    setTheme(theme === true ? 'dark' : 'light')
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
  }

  return (
    <div className='flex w-full flex-col items-center justify-center px-4 pt-10'>
      <span className='flex w-full justify-center px-20'>
        <Button
          onClick={() => themeToggle(!themeBtn)}
          className='hover:cursor-pointer'
        >
          {themeBtn ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </Button>
      </span>
      <h1 className='mt-10 text-4xl font-bold uppercase italic text-shadow-lg'>
        The Library App
      </h1>
      <section className='mt-20'>
        <form onSubmit={handleSubmit} className=''>
          <div className='flex w-full items-center justify-around'>
            <Input
              type='text'
              placeholder='Search Here'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='block w-auto'
            />
            <Button className='w-1/2' type='submit'>
              Search
            </Button>
          </div>
        </form>
      </section>
      <section className='mt-10 flex w-full justify-center'>
        <ul className='grid w-full grid-cols-1 gap-4 md:grid-cols-3'>
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
                        className='absolute -right-4 hover:cursor-pointer'
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
