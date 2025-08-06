'use client'
import Link from 'next/link'
import Image from 'next/image'
import notFoundIcon from '../../public/images/not-found.svg'
import { AspectRatio } from '@/components/ui/aspect-ratio'
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
      <AspectRatio ratio={16 / 9}>
        <Image src={notFoundIcon} alt={'Not Found Icon'} fill />
      </AspectRatio>
    </section>
  )
}
