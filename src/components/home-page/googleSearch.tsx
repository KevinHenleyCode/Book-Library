'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { GoogleBookList } from '@/types/book'
import GoogleSearchResult from './googleSearchResult'

const GoogleSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GoogleBookList>([])

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

  return (
    <div className='w-full'>
      <section className='mt-20'>
        <form onSubmit={handleSearchGoogleBooks}>
          <div className='flex w-full items-center justify-center gap-2'>
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
      <GoogleSearchResult results={results} />
    </div>
  )
}

export default GoogleSearch
