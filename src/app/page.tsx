import GoogleSearch from '@/components/home-page/google-search'

const HomePage = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center px-4 pt-10'>
      <h1 className='mt-10 text-4xl font-bold uppercase italic text-shadow-lg'>
        The Library App
      </h1>
      <GoogleSearch />
    </div>
  )
}

export default HomePage
