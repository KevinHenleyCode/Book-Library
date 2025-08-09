'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { GoogleBookList } from '@/types/book'
import type { BookSearch } from '@/types/search'
import GoogleSearchResult from './googleSearchResult'

const GoogleSearch = () => {
  const [filters, setFilters] = useState<BookSearch>({
    userInput: '',
    standardParameters: 'inauthor',
    downloadable: false,
    digitalType: '',
    pageStartIndex: 0,
    pageMaxResults: 40,
    printType: 'books',
    projectionFull: true,
    orderBy: 'relevance',
  })
  const {
    userInput,
    standardParameters,
    // downloadable,
    // digitalType,
    // pageStartIndex,
    // pageMaxResults,
    // printType,
    // projectionFull,
    // orderBy,
  } = filters
  const [results, setResults] = useState<GoogleBookList>([])

  const cleanStandardParameter = (word: string): string => {
    const removeFirstTwoLetters = word.replace('in', '')
    const capitalizeFirstLetter =
      removeFirstTwoLetters.charAt(0).toUpperCase() +
      removeFirstTwoLetters.slice(1)
    return capitalizeFirstLetter
  }

  const handleSearchGoogleBooks = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/search-google-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters }),
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
              placeholder={`Search By: ${cleanStandardParameter(standardParameters)}`}
              value={userInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, userInput: e.target.value }))
              }
              className='w-52 sm:w-72'
            />
            <Button className='w-28' type='submit'>
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
