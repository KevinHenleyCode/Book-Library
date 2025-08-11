'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { GoogleBookList } from '@/types/book'
import type {
  BookSearch,
  StandardParameters,
  DigitalType,
  PageMaxResults,
  PrintType,
  OrderBy,
} from '@/types/search'
import GoogleSearchResult from './googleSearchResult'
import { ChevronsUpDown } from 'lucide-react'

const GoogleSearch = () => {
  const [filters, setFilters] = useState<BookSearch>({
    userInput: '',
    standardParameters: 'inauthor',
    downloadable: false,
    digitalType: 'null',
    pageStartIndex: 0,
    pageMaxResults: 10,
    printType: 'all',
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

  const filtersRef = useRef(filters)
  useEffect(() => {
    filtersRef.current = filters
  }, [filters])

  const fetchBooks = useCallback(async () => {
    const input = filtersRef.current
    if (!input.userInput) return

    try {
      const res = await fetch('/api/search-google-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters: input }),
      })

      const result = await res.json()

      if (result.success) {
        const { items } = result.data
        setResults(items)
      } else {
        setResults([])
      }
    } catch (err) {
      console.error(`Search Error: ${err}`)
    }
  }, [])

  const handleSearchGoogleBooks = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    void fetchBooks()
  }

  useEffect(() => {
    void fetchBooks()
  }, [filters.pageStartIndex, fetchBooks])

  return (
    <div className='w-full'>
      <section className='mt-20'>
        <form onSubmit={handleSearchGoogleBooks}>
          <div className='grid w-full gap-2 lg:justify-center'>
            <span className='grid grid-cols-4 gap-4'>
              <Input
                type='text'
                required
                placeholder={`Search By: ${cleanStandardParameter(filters.standardParameters)}`}
                value={filters.userInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilters((prev) => ({ ...prev, userInput: e.target.value }))
                }
                className='col-span-4 md:col-span-2'
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
                <SelectTrigger className='col-span-4 w-full md:col-span-2 lg:col-span-1'>
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
              <span className='col-span-4 flex justify-center lg:col-span-1'>
                <Button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      pageStartIndex: 0,
                    }))
                  }
                  className='w-1/2 lg:w-full'
                  type='submit'
                >
                  Search
                </Button>
              </span>
            </span>
            <Collapsible className='mt-4'>
              <CollapsibleTrigger
                asChild
                className='flex w-full justify-center'
              >
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className='mx-auto w-3/4'
                >
                  <span>More Filters</span>
                  <ChevronsUpDown />
                </Button>
              </CollapsibleTrigger>
              <span className='mt-2 grid grid-cols-4 gap-4 p-2'>
                <CollapsibleContent className='col-span-2'>
                  <Select
                    value={filters.digitalType}
                    onValueChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        digitalType: val as DigitalType,
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder={`Digital Formats: ${filters.digitalType}`}
                      />
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
                </CollapsibleContent>
                <CollapsibleContent className='col-span-2'>
                  <Select
                    value={filters.printType}
                    onValueChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        printType: val as PrintType,
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={filters.printType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All</SelectItem>
                      <SelectItem value='books'>Books</SelectItem>
                      <SelectItem value='magazines'>Magazines</SelectItem>
                    </SelectContent>
                  </Select>
                </CollapsibleContent>
                <CollapsibleContent className='col-span-4 flex justify-center'>
                  <Label>
                    <Checkbox
                      checked={filters.downloadable}
                      onCheckedChange={(c: boolean) =>
                        setFilters((prev) => ({ ...prev, downloadable: c }))
                      }
                    />
                    <p>Downloadable</p>
                  </Label>
                </CollapsibleContent>
              </span>
            </Collapsible>
          </div>
        </form>
        <Separator className='my-4' />
      </section>
      <section>
        <div className='flex w-full justify-between'>
          <Select
            value={filters.orderBy}
            onValueChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                orderBy: val as OrderBy,
              }))
            }
          >
            <SelectTrigger className='w-fit'>
              <SelectValue placeholder={filters.orderBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='relevance'>Relevance</SelectItem>
              <SelectItem value='newest'>Newest</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.pageMaxResults.toString()}
            onValueChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                pageMaxResults: Number(val) as PageMaxResults,
                pageStartIndex: 0,
              }))
            }
          >
            <SelectTrigger className='w-fit'>
              <SelectValue placeholder={filters.pageMaxResults} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='30'>30</SelectItem>
              <SelectItem value='40'>40</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <GoogleSearchResult results={results} />
      <Separator className='my-4' />
      <section>
        <div className='relative mt-10'>
          <Pagination className='absolute bottom-0'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className='hover:cursor-pointer'
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      pageStartIndex: Math.max(
                        0,
                        prev.pageStartIndex - prev.pageMaxResults,
                      ),
                    }))
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className='hover:cursor-pointer'
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      pageStartIndex: prev.pageStartIndex + prev.pageMaxResults,
                    }))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  )
}

export default GoogleSearch
