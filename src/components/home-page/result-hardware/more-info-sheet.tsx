import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Info } from 'lucide-react'
import type { GoogleBook } from '@/types/book'
import Image from 'next/image'
import NoBookImage from '@/assets/no-book-image.svg'
import InfoDataRow from './more-info-hardware/info-data-row'

interface MoreInfoSheet {
  book: GoogleBook
}

const MoreInfoSheet = ({ book }: MoreInfoSheet) => {
  const info = book.volumeInfo
  //   const price = book.saleInfo
  //   const access = book.accessInfo
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='hover:cursor-pointer' variant={'outline'}>
            <Info />
          </Button>
        </SheetTrigger>
        <SheetContent className='items-center'>
          <SheetHeader className='w-full text-left'>
            <SheetTitle>
              {info.title}: {info.subtitle ? `( ${info.subtitle} )` : ''}
            </SheetTitle>
            <SheetDescription>By: {info.authors}</SheetDescription>
          </SheetHeader>
          <div className=''>
            {info?.imageLinks ? (
              <Image
                src={info.imageLinks.thumbnail}
                alt={info.title}
                width={100}
                height={100}
                className='aspect-[6/9] w-auto rounded-sm shadow-md shadow-black'
              />
            ) : (
              <div className='bg-muted relative mx-auto aspect-[6/9] w-1/2 rounded-sm shadow-md shadow-black'>
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
          </div>
          <div className='px-4'>
            <span>
              <b className='text-lg'>Description:</b>
              <ScrollArea className='bg-primary-foreground mt-1 h-56 rounded-md border px-2 py-1'>
                {info.description ? info.description : 'No description yet.'}
              </ScrollArea>
            </span>
            <Accordion type='single' collapsible className='mt-4'>
              <AccordionItem value='details'>
                <AccordionTrigger className='p-1 text-lg font-bold hover:cursor-pointer hover:no-underline'>
                  Details
                </AccordionTrigger>
                <Separator />
                <AccordionContent className='bg-primary-foreground p-2'>
                  <InfoDataRow subject={'Pages'} data={`${info.pageCount}`} />
                  <InfoDataRow
                    subject={'Publisher'}
                    data={`${info.publisher}`}
                  />
                  <InfoDataRow
                    subject={'Published At'}
                    data={`${info.publishedDate}`}
                  />
                  <InfoDataRow
                    subject={'Category'}
                    data={`${info.categories}`}
                  />
                  <InfoDataRow subject={'Language'} data={`${info.language}`} />
                  <InfoDataRow
                    subject={'ISBN-13'}
                    data={`${info.industryIdentifiers ? info.industryIdentifiers[0].identifier : 'Not Found'}`}
                  />
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value='pricing'>
                <AccordionTrigger className='p-1 text-lg font-bold hover:cursor-pointer hover:no-underline'>
                  Pricing
                </AccordionTrigger>
                <AccordionContent className='bg-primary-foreground p-2'>
                  <InfoDataRow
                    subject={'Price'}
                    data={`${price?.listPrice?.amount}`}
                  />
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MoreInfoSheet
