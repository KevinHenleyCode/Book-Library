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
import type { MyBook, GoogleBookList, GoogleBook } from '@/types/book'

interface GoogleSearchResultProps {
  results: GoogleBookList
}

const GoogleSearchResult = ({ results }: GoogleSearchResultProps) => {
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
    <section className='mt-10 flex w-full justify-center'>
      <ul className='3xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-9 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {results?.map((book) => {
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
  )
}

export default GoogleSearchResult
