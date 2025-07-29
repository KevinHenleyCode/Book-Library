import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-[32px] sm:items-start'>
        <h1 className='text-8xl font-bold text-orange-400 uppercase italic text-shadow-lg text-shadow-orange-300'>
          The Library App
        </h1>

        <Image
          className='mt-20 dark:invert'
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
