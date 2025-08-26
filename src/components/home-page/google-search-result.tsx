import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { isBookInMyLibrary, saveToMyLibrary } from '@/lib/libraryServices'
import { BookmarkPlus, Check } from 'lucide-react'
import type { GoogleBookList, GoogleBook } from '@/types/book'
import { mapGoogleBookToMyBook } from '@/mappers/googleBooks'
import { useState, useEffect, useCallback } from 'react'
import NoBookImage from '@/assets/no-book-image.svg'
// import ListBlock from '@/components/home-page/result-hardware/list-block'

interface GoogleSearchResultProps {
  results: GoogleBookList
  userName?: string
}

const GoogleSearchResult = ({
  results,
  // userName
}: GoogleSearchResultProps) => {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const checkSaved = useCallback(async () => {
    const ids = await Promise.all(
      results.map(async (book) => ({
        id: book.id,
        exists: await isBookInMyLibrary(book.id),
      })),
    )
    setSavedIds(new Set(ids.filter((i) => i.exists).map((i) => i.id)))
  }, [results])

  const handleSaveToMyLibrary = async (
    googleBook: GoogleBook,
    saveToList: string[],
  ) => {
    try {
      const myBook = mapGoogleBookToMyBook(googleBook, saveToList)
      const { success, message } = await saveToMyLibrary(myBook)
      if (success) {
        toast.success(message)
        checkSaved()
      } else {
        console.error(message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (results.length > 0) {
      void checkSaved()
    } else {
      setSavedIds(new Set())
      return
    }
  }, [checkSaved, results])

  return (
    <section className='mt-10 flex w-full justify-center'>
      {results?.length === 0 ? (
        <Card className='bg-background h-[30rem] w-full'>
          <CardContent className='flex h-full items-center justify-center'>
            <h3 className='text-muted-foreground text-lg font-semibold lg:text-4xl'>
              Books you search will show up here
            </h3>
          </CardContent>
        </Card>
      ) : (
        <ul className='3xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-9 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {results?.map((book) => {
            const info = book.volumeInfo
            const inLibrary = savedIds.has(book.id)
            return (
              <li key={book.id}>
                <Card className='h-full p-2'>
                  <CardHeader>
                    <CardAction className='relative top-0 flex w-full justify-end'>
                      <Button
                        onClick={() => handleSaveToMyLibrary(book, [])}
                        variant={'secondary'}
                        className={`hover:text-chart-2 absolute -right-4 transition-all duration-200 ease-in-out hover:cursor-pointer ${inLibrary ? 'bg-background' : ''}`}
                        disabled={inLibrary}
                      >
                        {!inLibrary ? (
                          <BookmarkPlus />
                        ) : (
                          <Check className='text-chart-2' strokeWidth={4} />
                        )}
                      </Button>
                    </CardAction>
                    <CardContent className='flex h-[200px] justify-center py-1'>
                      {/* ________________________________TEST________________________________ */}
                      {/* <ListBlock userName={userName} /> */}
                      {/* ________________________________TEST________________________________ */}
                      {info?.imageLinks ? (
                        <Image
                          src={info.imageLinks.thumbnail}
                          alt={info.title}
                          width={100}
                          height={100}
                          className='aspect-[6/9] w-auto rounded-sm shadow-md shadow-black'
                        />
                      ) : (
                        <div className='bg-muted relative aspect-[6/9] w-auto rounded-sm shadow-md shadow-black'>
                          <span className='text-destructive absolute top-0 z-20 flex h-full w-full flex-col justify-between text-center text-xl font-semibold tracking-wider'>
                            <p>Sorry No</p>
                            <p>Image Yet</p>
                          </span>
                          <NoBookImage
                            className='text-foreground h-full w-full'
                            alt={info.title}
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardTitle className='truncate text-center text-xl'>
                      {info.title}
                    </CardTitle>
                    <CardContent className='text-md text-center'>
                      {info.authors?.map((author, index) => (
                        <p key={index} className={index >= 2 ? 'hidden' : ''}>
                          {author}
                        </p>
                      ))}
                    </CardContent>
                  </CardHeader>
                </Card>
              </li>
            )
          }) || []}
        </ul>
      )}
    </section>
  )
}

export default GoogleSearchResult
