'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { saveBook } from '@/lib/libraryServices'

const Home = () => {
  type Book = {
    id: string
    volumeInfo: {
      title: string
      publisher: string
      imageLinks: {
        smallThumbnail: string
      }
    }
  }
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
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

  const handleSave = (bookChoice: any) => {
    const book = {
      id: bookChoice.id,
      title: bookChoice.volumeInfo.title,
      authors: bookChoice.volumeInfo.authors || [],
      publisher: bookChoice.volumeInfo.publisher,
      thumbnail: bookChoice.volumeInfo.imageLinks?.thumbnail,
      createdAt: Date.now(),
    }
    saveBook(book)
  }

  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      <span className='flex w-full justify-end px-20'>
        <Button
          onClick={() => themeToggle(!themeBtn)}
          className='hover:cursor-pointer'
        >
          {themeBtn ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </Button>
      </span>
      <h1 className='text-8xl font-bold uppercase italic text-shadow-lg'>
        The Library App
      </h1>
      <section className='mt-20 flex justify-center'>
        <form
          onSubmit={handleSubmit}
          className='flex w-full max-w-sm items-center gap-2'
        >
          <Input
            type='text'
            placeholder='Search Here'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type='submit'>Search</Button>
        </form>
      </section>
      <section className='mt-10 flex w-full justify-center'>
        <ul className='grid w-5/6 grid-cols-3 gap-4'>
          {results.map((books) => {
            const info = books.volumeInfo
            return (
              <li key={books.id}>
                <Button onClick={() => handleSave(books)}>Add Book</Button>
                <Card className='h-full'>
                  <CardHeader>
                    <CardTitle className='text-2xl'>{info.title}</CardTitle>
                    <CardContent className='text-lg'>
                      {info.publisher}
                    </CardContent>
                    <div className='mt-2 flex w-full justify-center'>
                      {info?.imageLinks ? (
                        <Image
                          src={info.imageLinks.smallThumbnail}
                          alt={info.title}
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
    </div>
  )
}

export default Home
