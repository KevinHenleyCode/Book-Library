import { Metadata } from 'next'
import MyLibrarySearch from '@/components/my-library-page/myLibrarySearch'

export const metadata: Metadata = {
  title: 'My Books',
}

const LibraryPage = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center px-4 pt-10'>
      <h1 className='mt-10 text-4xl font-bold uppercase italic text-shadow-lg'>
        My Library
      </h1>
      <MyLibrarySearch />
    </div>
  )
}

export default LibraryPage
