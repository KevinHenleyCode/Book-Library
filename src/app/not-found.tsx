'use client'
import Link from 'next/link'
import NotFoundImage from '@/assets/not-found-image.svg'
import { Button } from '@/components/ui/button'
import { CornerDownLeft } from 'lucide-react'

/**
 * Default page when route doesn't exist
 */
export default function NotFound() {
  return (
    <section className='mt-20 flex flex-col items-center justify-center px-4'>
      <h1 className='font text-4xl font-semibold'>
        Looks like that page {`doesn't`} exist.
      </h1>
      <Link href={'/'} className='my-10'>
        <Button variant={'secondary'} className='hover:cursor-pointer'>
          <CornerDownLeft />
          Return Home
        </Button>
      </Link>
      <div className='4xl:w-1/4 5xl:w-1/6 w-full sm:w-1/2 xl:w-1/3'>
        <NotFoundImage
          alt='Not Found Icon'
          className='text-foreground h-full w-full'
        />
      </div>
    </section>
  )
}
