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
import { Separator } from '@/components/ui/separator'
import { Info, X } from 'lucide-react'
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
        <SheetContent className='h-full px-4 py-8'>
          <span className='flex w-full justify-end'>
            <SheetClose asChild>
              <Button variant={'outline'} className='hover:cursor-pointer'>
                <X />
              </Button>
            </SheetClose>
          </span>
          <ScrollArea className='h-full'>
            <SheetHeader className='w-full text-left'>
              <SheetTitle className='lg:text-lg 2xl:text-2xl'>
                {info.title}: {info.subtitle ? `( ${info.subtitle} )` : ''}
              </SheetTitle>
              <SheetDescription className='2xl:text-lg'>
                By: {info.authors}
              </SheetDescription>
            </SheetHeader>
            <div className='flex w-full justify-center'>
              {info?.imageLinks ? (
                <Image
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  width={100}
                  height={100}
                  className='aspect-[6/9] h-full w-36 rounded-sm shadow-md shadow-black lg:w-44 2xl:w-56'
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
            <div className='mt-4 px-4'>
              <span>
                <b className='text-lg 2xl:text-xl'>Description:</b>
                <p className='bg-primary-foreground mt-1 rounded-md border px-2 py-1 2xl:text-lg'>
                  {info.description ? info.description : 'No description yet.'}
                </p>
              </span>
              <Accordion type='single' collapsible className='mt-4 mb-8'>
                <AccordionItem value='details'>
                  <AccordionTrigger className='p-1 text-lg font-bold hover:cursor-pointer hover:no-underline 2xl:text-xl'>
                    Details
                  </AccordionTrigger>
                  <Separator />
                  <AccordionContent className='bg-primary-foreground p-2 2xl:text-lg'>
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
                    <InfoDataRow
                      subject={'Language'}
                      data={`${info.language}`}
                    />
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
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MoreInfoSheet
