import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import InfoData from '@/components/home-page/result-hardware/more-info-hardware/info-data-row'
import { Info, X } from 'lucide-react'
import type { MyBook } from '@/types/book'
import Image from 'next/image'

interface EditInfoSheetProps {
  book: MyBook
}

const EditInfoSheet = ({ book }: EditInfoSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='hover:cursor-pointer'>
          <Info />
        </Button>
      </SheetTrigger>

      <SheetContent className='h-full px-4 py-8'>
        <span className='flex w-full justify-end'>
          <SheetClose asChild>
            <Button variant='outline' className='hover:cursor-pointer'>
              <X />
            </Button>
          </SheetClose>
        </span>
        <ScrollArea className='h-full'>
          <SheetHeader>
            <SheetTitle>{book.title}</SheetTitle>
            <SheetDescription>{book.authors}</SheetDescription>
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
              <p>{book.description}</p>
            </span>
            <Accordion type='single' collapsible className='mt-4 mb-8'>
              <AccordionItem value='details'>
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>
                  <InfoData subject={'Publisher'} data={`${book.publisher}`} />
                  <InfoData
                    subject={'Published At'}
                    data={`${book.publishedDate}`}
                  />
                  <InfoData subject={'Category'} data={`${book.categories}`} />
                  <InfoData subject={'Language'} data={`${book.language}`} />
                  <InfoData
                    subject={'ISBN-13'}
                    data={`${book.industryIdentifiers ? book.industryIdentifiers[0].identifier : 'Not Found'}`}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default EditInfoSheet
