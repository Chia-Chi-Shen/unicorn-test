'use client'

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'


export default function Messages() {

    const [message, setMessage] = useState("");
    let param = useSearchParams();
    const scores = param.get('data')
    
    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onClick = async () => {
        if (message == "") return
        await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify(message)
        })
        .then(response => response.json())
    }

    return(
        <div className="w-full h-full max-sm:bg-[url('/images/message-bg.png')] bg-center bg-cover">
            <div className="relative">
            <Image className='px-7 pt-32 ' src='/images/message-content.png' width={916} height={1034} alt="寫下給其他夥伴的祝福吧！"/>
            <textarea className="absolute top-[64%] left-[17%] w-[67%] h-1/4 rounded-md p-3
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" 
                placeholder="寫下給其他夥伴的祝福吧！(上限50字）" onChange={onChange} value={message} maxLength={50}>
                    
            </textarea>
            </div>
            <div className="flex flex-row justify-between content-between px-20 pt-10 ">
            <a className="basis-auto" href={`/result?data=${scores}`}>
                <Image className="" src='/images/skip-btn.png' width={214/2.5} height={132/2.5} alt="略過"/> 
            </a>
            <a className="basis-auto" href={`/result?data=${scores}`} onClick={onClick}>
                <Image className="" src='/images/submit-btn.png' width={214/2.5} height={132/2.5} alt="送出"/>
            </a>
            </div>
        </div>
    );
}