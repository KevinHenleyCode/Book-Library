import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'
import { deleteBookFromMyLibrary } from '@/lib/libraryServices'
import { Trash2 } from 'lucide-react'
import type { MyBookList } from '@/types/book'

interface MyLibrarySearchResultProps {
  books: MyBookList
  handleGetBooksFromMyLibrary: () => Promise<void>
}

const MyLibrarySearchResult = ({
  books,
  handleGetBooksFromMyLibrary,
}: MyLibrarySearchResultProps) => {
  const handleDeleteBookFromMyLibrary = async (id: string, title: string) => {
    const { success, message } = await deleteBookFromMyLibrary(id, title)

    if (success) {
      handleGetBooksFromMyLibrary()
      toast.error(message)
    } else {
      console.error(message)
    }
  }

  return (
    <section className='mt-10 flex w-full justify-center'>
      {books.length === 0 ? (
        <Card className='bg-background h-[30rem] w-full'>
          <CardContent className='flex h-full items-center justify-center'>
            <h3 className='text-muted-foreground text-lg font-semibold lg:text-4xl'>
              Books you save will show up here
            </h3>
          </CardContent>
        </Card>
      ) : (
        <ul className='3xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-9 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Card className='h-full'>
                  <CardHeader>
                    <CardAction className='relative top-0 flex w-full justify-end'>
                      <Button
                        onClick={() =>
                          handleDeleteBookFromMyLibrary(book.id, book.title)
                        }
                        variant={'secondary'}
                        className='hover:text-destructive absolute -right-4 transition-all duration-200 ease-in-out hover:cursor-pointer'
                      >
                        <Trash2 />
                      </Button>
                    </CardAction>
                    <CardContent className='flex justify-center'>
                      {book?.imageLinksThumbnail ||
                      book?.imageLinksSmallThumbnail ? (
                        <Image
                          src={
                            book.imageLinksThumbnail ||
                            book.imageLinksSmallThumbnail
                          }
                          alt={book.title}
                          width={100}
                          height={100}
                          className='aspect-[6/9] h-auto w-auto rounded-sm shadow-md shadow-black'
                        />
                      ) : null}
                    </CardContent>
                    <CardTitle className='text-center text-xl'>
                      {book.title}
                    </CardTitle>
                    <CardContent className='text-md text-center'>
                      {book.authors}
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

export default MyLibrarySearchResult
