import Image from 'next/image'

export default function Home() {

  return (
    <div className='container px-[3%] flex flex-col content-center h-full justify-start'>
      <Image className='px-[4%] pt-[2%] basis-auto' src='/images/home-title.webp' alt='' width={890} height={450}/>
      <Image className='basis-auto' priority src='/images/home.webp' alt='' width={827} height={916} />
      {/* <video className='basis-auto' autoPlay loop playsInline muted>
        <source src='/videos/home-video.mp4' type='video/mp4'/>
      </video> */}
      <a className='basis-auto self-center pt-6' href='/items'>
      <Image className='w-auto h-auto' src='/images/home-start-btn.webp' alt='start' width={313/3} height={141/3}/>
      </a>
    </div>
  )
}


