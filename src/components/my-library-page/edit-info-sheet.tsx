import { useState } from 'react'
import { saveToMyLibrary } from '@/lib/libraryServices'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import InfoData from '@/components/home-page/result-hardware/more-info-hardware/info-data-row'
import { Info, X, Pencil, Check } from 'lucide-react'
import type { MyBook } from '@/types/book'
import Image from 'next/image'
import { toast } from 'sonner'

interface EditInfoSheetProps {
  book: MyBook
  handleGetBooksFromMyLibrary: () => Promise<void>
}

const EditInfoSheet = ({
  book,
  handleGetBooksFromMyLibrary,
}: EditInfoSheetProps) => {
  const [editStatus, setEditStatus] = useState(false)
  const [editData, setEditData] = useState<MyBook>(book)

  const handleSaveEdit = async (showToast: boolean) => {
    const { success, message } = await saveToMyLibrary(editData)
    if (success) {
      if (showToast === true) toast.success(message)
      handleGetBooksFromMyLibrary()
    } else {
    }
  }

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) handleSaveEdit(true)
      }}
    >
      <SheetTrigger asChild>
        <Button variant='outline' className='hover:cursor-pointer'>
          <Info />
        </Button>
      </SheetTrigger>

      <SheetContent className='h-full px-4 py-8'>
        <div className='flex w-full justify-end'>
          <SheetClose asChild>
            <Button variant='ghost' className='hover:cursor-pointer'>
              <X />
            </Button>
          </SheetClose>
        </div>
        <ScrollArea className='h-full'>
          <div className='flex justify-end'>
            {editStatus === false ? (
              <Button
                variant='secondary'
                onClick={() => setEditStatus(!editStatus)}
                className='hover:[&>svg]:text-chart-3 cursor-pointer transition-all duration-150 ease-in-out'
              >
                <Pencil className='transition-all duration-150 ease-in-out' />
              </Button>
            ) : (
              <Button
                variant='secondary'
                onClick={() => (
                  setEditStatus(!editStatus),
                  handleSaveEdit(false)
                )}
                className='hover:[&>svg]:text-chart-2 cursor-pointer transition-all duration-150 ease-in-out'
              >
                <Check className='transition-all duration-150 ease-in-out' />
              </Button>
            )}
          </div>
          <SheetHeader>
            <SheetTitle>
              {editStatus === false ? (
                book.title
              ) : (
                <Input
                  type='text'
                  placeholder={editData.title}
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              )}
            </SheetTitle>
            <SheetDescription>
              {editStatus === false ? (
                book.authors
              ) : (
                <Input
                  type='text'
                  placeholder={`${editData.authors}`}
                  value={editData.authors}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      authors: [e.target.value],
                    }))
                  }
                />
              )}
            </SheetDescription>
          </SheetHeader>
          <div className='flex w-full justify-center'>
            <Image
              src={book.imageLinksThumbnail}
              alt={book.title}
              width={100}
              height={100}
              className='aspect-[6/9] h-full w-36 rounded-sm shadow-md shadow-black lg:w-44 2xl:w-56'
            />
          </div>
          <div className='mt-4 px-4'>
            <span>
              <b>Details:</b>
              {editStatus === false ? (
                <p>{book.description}</p>
              ) : (
                <Textarea
                  placeholder={editData.description}
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className='mt-2'
                />
              )}
            </span>
            <Accordion type='single' collapsible className='mt-4 mb-8'>
              <AccordionItem value='more details'>
                <AccordionTrigger>More Details</AccordionTrigger>
                {editStatus === false ? (
                  <AccordionContent>
                    <InfoData
                      subject={'Publisher'}
                      data={`${book.publisher}`}
                    />
                    <InfoData
                      subject={'Published At'}
                      data={`${book.publishedDate}`}
                    />
                    <InfoData
                      subject={'Category'}
                      data={`${book.categories}`}
                    />
                    <InfoData subject={'Language'} data={`${book.language}`} />
                    <InfoData
                      subject={'ISBN-13'}
                      data={`${book.industryIdentifiers ? book.industryIdentifiers[0].identifier : 'Not Found'}`}
                    />
                  </AccordionContent>
                ) : (
                  <AccordionContent className='[&>span]:mb-2 [&>span]:flex [&>span]:items-center [&>span]:justify-between'>
                    <span>
                      <b>{'Publisher'}</b>
                      <Input
                        type='text'
                        placeholder={editData.publisher}
                        value={editData.publisher}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            publisher: e.target.value,
                          }))
                        }
                        className='h-fit w-1/2'
                      />
                    </span>
                    <span>
                      <b>{'Published At'}</b>
                      <Input
                        type='text'
                        placeholder={editData.publishedDate}
                        value={editData.publishedDate}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            publishedDate: e.target.value,
                          }))
                        }
                        className='h-fit w-1/2'
                      />
                    </span>
                    <span>
                      <b>{'Category'}</b>
                      <Input
                        type='text'
                        placeholder={`${editData.categories}`}
                        value={editData.categories}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            categories: [e.target.value],
                          }))
                        }
                        className='h-fit w-1/2'
                      />
                    </span>
                    <span>
                      <b>{'Language'}</b>
                      <Input
                        type='text'
                        placeholder={editData.language}
                        value={editData.language}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            language: e.target.value,
                          }))
                        }
                        className='h-fit w-1/2'
                      />
                    </span>
                    <span>
                      <b>{'ISBN-13'}</b>
                      <p>
                        {book.industryIdentifiers
                          ? book.industryIdentifiers[0].identifier
                          : 'Not Found'}
                      </p>
                      {/* <Input
                        type='text'
                        placeholder={
                          editData.industryIdentifiers
                            ? editData.industryIdentifiers[0].identifier
                            : 'Not Found'
                        }
                        value={
                          editData.industryIdentifiers
                            ? editData.industryIdentifiers[0].identifier
                            : 'Not Found'
                        }
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            identifier: e.target.value,
                          }))
                        }
                        className='h-fit w-1/2'
                      /> */}
                    </span>
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default EditInfoSheet
