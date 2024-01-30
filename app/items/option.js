import Image from "next/image"

const Option = ({text})  => {
    return (
        <div className="pb-7 relative">
        <div className="absolute top-[23%] left-[15%] font-[naikaifont]">
            {text}
        </div>
        <Image className='basis-auto self-center px-7' src='/images/item-option.webp' width={818} height={211} alt={text} priority/>
        </div>
    )
}

export default Option;