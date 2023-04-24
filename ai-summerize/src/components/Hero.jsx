

function Hero() {
  return (
    <header className="  w-full flex justify-center items-center flex-col">
      <nav className='flex justify-between items-center w-full mb-1 p-3'>
        <img className='w-28 object-contain rounded-full' src="/images.png" alt='sumz_logo'  />

        <button
          className='rounded-md border border-black bg-black py-1.5 px-5 
          text-sm text-white transition-all hover:bg-white hover:text-black;'
          type='button'
          onClick={() =>
            window.open("https://github.com/Akhilesh-pujar", "_blank")}
        >
          GitHub
        </button>
      </nav>

      <h1 className='mt-5 text-5xl font-bold leading-[1.15] text-black sm:text-6xl text-center;'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>OpenAI GPT-4</span>
      </h1>
      <h2 className=' mt-5 text-lg text-gray-600 sm:text-xl text-center max-w-2xl;'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>

    </header>
  )
}

export default Hero
