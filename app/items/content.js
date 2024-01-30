import Image from "next/image"

const Content = ({text})  => {
    return (
        <div className="relative"> 
        <div className="absolute top-[32%] left-[19%] w-[70%] font-[naikaifont]"> 
            {text}
        </div>
        <Image className='basis-auto' src='/images/item-content.webp' width={959} height={443} alt={text} priority/>
        </div>
    )
}

export default Content;