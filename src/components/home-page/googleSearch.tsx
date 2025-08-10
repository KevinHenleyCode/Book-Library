'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { GoogleBookList } from '@/types/book'
import type {
  BookSearch,
  StandardParameters,
  DigitalType,
  PageMaxResults,
} from '@/types/search'
import GoogleSearchResult from './googleSearchResult'

const GoogleSearch = () => {
  const [filters, setFilters] = useState<BookSearch>({
    userInput: '',
    standardParameters: 'inauthor',
    downloadable: false,
    digitalType: 'ebooks',
    pageStartIndex: 0,
    pageMaxResults: '40',
    printType: 'books',
    projectionFull: true,
    orderBy: 'relevance',
  })
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
              placeholder={`Search By: ${cleanStandardParameter(filters.standardParameters)}`}
              value={filters.userInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, userInput: e.target.value }))
              }
              className='w-52 sm:w-72'
            />
            <Select
              value={filters.standardParameters}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  standardParameters: val as StandardParameters,
                }))
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue
                  placeholder={cleanStandardParameter(
                    filters.standardParameters,
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='inauthor'>Author</SelectItem>
                <SelectItem value='intitle'>Title</SelectItem>
                <SelectItem value='inpublisher'>Publisher</SelectItem>
                <SelectItem value='subject'>Subject</SelectItem>
                <SelectItem value='isbn'>ISBN</SelectItem>
                <SelectItem value='lccn'>LCCN</SelectItem>
                <SelectItem value='oclc'>OCLC</SelectItem>
              </SelectContent>
            </Select>
            <Label>
              <Checkbox
                checked={filters.downloadable}
                onCheckedChange={(c: boolean) =>
                  setFilters((prev) => ({ ...prev, downloadable: c }))
                }
              />
              <p>Downloadable</p>
            </Label>
            <Select
              value={filters.digitalType}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  digitalType: val as DigitalType,
                }))
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={filters.digitalType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='null'>All</SelectItem>
                <SelectItem value='partial'>Partial</SelectItem>
                <SelectItem value='full'>Full</SelectItem>
                <SelectItem value='free-ebooks'>Free Ebooks</SelectItem>
                <SelectItem value='paid-ebooks'>Paid Ebook</SelectItem>
                <SelectItem value='ebooks'>Ebooks</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.pageMaxResults}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  pageMaxResults: val as PageMaxResults,
                }))
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={filters.pageMaxResults} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='30'>30</SelectItem>
                <SelectItem value='40'>40</SelectItem>
              </SelectContent>
            </Select>
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
