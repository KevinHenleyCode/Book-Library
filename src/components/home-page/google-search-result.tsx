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
import { saveToMyLibrary } from '@/lib/libraryServices'
import { BookmarkPlus } from 'lucide-react'
import type { GoogleBookList, GoogleBook } from '@/types/book'
import { mapGoogleBookToMyBook } from '@/mappers/googleBooks'
// import ListBlock from '@/components/home-page/result-hardware/list-block'

interface GoogleSearchResultProps {
  results: GoogleBookList
}

const GoogleSearchResult = ({ results }: GoogleSearchResultProps) => {
  const handleSaveToMyLibrary = async (
    googleBook: GoogleBook,
    saveToList: string[],
  ) => {
    try {
      const myBook = mapGoogleBookToMyBook(googleBook, saveToList)
      const { success, message } = await saveToMyLibrary(myBook)
      if (success) {
        toast.success(message)
      } else {
        console.error(message)
      }
    } catch (err) {
      console.error(err)
    }
  }

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
            return (
              <li key={book.id}>
                <Card className='h-full p-2'>
                  <CardHeader>
                    <CardAction className='relative top-0 flex w-full justify-end'>
                      <Button
                        onClick={() => handleSaveToMyLibrary(book, [])}
                        variant={'secondary'}
                        className='hover:text-chart-2 absolute -right-4 transition-all duration-200 ease-in-out hover:cursor-pointer'
                      >
                        <BookmarkPlus />
                      </Button>
                    </CardAction>
                    <CardContent className='flex justify-center'>
                      {/* ________________________________TEST________________________________ */}
                      {/* <ListBlock /> */}
                      {/* ________________________________TEST________________________________ */}
                      {info?.imageLinks ? (
                        <Image
                          src={info.imageLinks.smallThumbnail}
                          alt={info.title}
                          width={100}
                          height={100}
                          className='aspect-[6/9] h-auto w-auto rounded-sm shadow-md shadow-black'
                        />
                      ) : (
                        <span className='text-destructive flex aspect-[6/9] h-full w-1/2 flex-col items-center justify-center rounded-sm shadow-md shadow-black sm:w-4/5 md:w-3/5'>
                          <span>Sorry No</span>
                          <span>Image Yet</span>
                        </span>
                      )}
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
      )}
    </section>
  )
}

export default GoogleSearchResult
