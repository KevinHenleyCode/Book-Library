import Image from 'next/image'

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1 className='uppercase text-8xl text-lime-400 font-bold italic text-shadow-lime-300 text-shadow-lg'>
          The Library App
        </h1>

        <Image
          className='dark:invert mt-20'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  )
}
