import Image from 'next/image'

export default function Home() {

  return (
    <div className='container px-[3%] flex flex-col content-center h-full justify-center'>
      <Image className='pt-[4%] basis-auto' src='/images/home-title.png' alt='' width={890} height={450}/>
      <video className='basis-auto' autoPlay loop playsInline muted>
        <source src='/videos/home-video.mp4' type='video/mp4'/>
      </video>
      <a className='basis-auto self-center pt-6' href='/items'>
      <Image className='' src='/images/home-start-btn.png' alt='start' width={313/3} height={141/3}/>
      </a>
    </div>
  )
}


