'use client'

import { useState, useEffect } from "react";
import { useItemContext } from "../containers/useItem";
import NextImage from "next/image"
import { useSearchParams } from "next/navigation";

const imgType = ["astronaut", "baby", "baker", "boxer", "scientist", "ballerina"] 
const divStyle = ["text-center w-full bg-[#92a6ce]", 
                    "text-center w-full bg-[#fbf3cf]", 
                    "text-center w-full bg-[#ffdede]", 
                    "text-center w-full bg-[#fff2dc]", 
                    "text-center w-full bg-[#eaf2d8]", 
                    "text-center w-full bg-[#fee8f6]"]

export default function Result() {

    const [message, setMessage] = useState("");
    const [loaded, setLoaded] = useState(0);
    const [vw, setVw] = useState(0);
    const [vh, setVh] = useState(0);
    const param = useSearchParams();
    const scores = param.get('data').split("").map((score) => parseInt(score)); //我愛copilot <3  


    const imgPath = "/images/results/" + imgType[scores.indexOf(Math.max(...scores))] + ".jpg";

    const generateImage = (message) => {


        const c = document.getElementById('outputCanvas');
        const ctx = c.getContext('2d');
      
        const img = new Image();
        img.src = imgPath;

        // var ratio = window.devicePixelRatio || 1;
        // console.log(ratio)
        // ctx.scale(ratio, ratio)
        const ratio = 3;

        
        function wrapText(context, text, x, y, maxWidth, lineHeight) {
            const words = text.split('');
            let line = '';

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && i > 0) {
                    context.fillText(line, x, y);
                    line = words[i] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
        }

        img.onload = function () {
            const imgScale = img.width / img.height;
            // c.width = Math.min(c.width * ratio, 1090);
            // c.height = Math.min(c.width / imgScale, 1920);
            // c.style.width = c.width + 'px'
            // c.style.height = c.height + 'px'

            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, c.width, c.height);

            ctx.fillStyle = 'white';
            ctx.font = `${10*ratio}px Hiragino Sans GB`
            wrapText(ctx, message, c.width*0.63, c.height*0.78, c.width*0.3, 14*ratio);
            // ctx.fillText(message, c.width*0.63, c.height*0.78, c.width*0.35);

            const dataUrl = c.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = '角獸測驗結果.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
      }
      

    const getMessage = async () => {

        await fetch('http://localhost:3000/api/message')
        .then(response => response.json())
        .then(data => {
            setMessage(data);
            setLoaded(loaded + 1)
            // console.log(data);
        })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    }

    useEffect(() => {
        setVw(window.innerWidth);
        setVh(window.innerHeight);
        getMessage();
    }, [])

    useEffect(() => {
        var ratio = window.devicePixelRatio || 1;
        const m = document.getElementById('result-message');
        const b = document.body;

        b.style.backgroundColor = divStyle[scores.indexOf(Math.max(...scores))].match(/#([a-fA-F\d]{6})/)[0];
        m.style.fontSize = `${window.innerWidth < 320 ? 6 : 13}px`;
        m.style.fontFamily = 'Hiragino Sans GB';
        m.style.lineHeight = `${15}px`;
    }, [message])

    return(
        <div className={divStyle[scores.indexOf(Math.max(...scores))]}>
            <canvas id="outputCanvas" width={1080} height={1920} className="hidden"></canvas>
            <div className="relative">
            <NextImage className="relative" src={imgPath} width={1080} height={1920} priority="true" alt="result"/>
            <div id="result-message" className="absolute top-[76%] left-[63%] text-white w-[30%] text-left
                                                font-['Hiragino Sans GB']">{message}</div>
            </div>
            <button onClick={() => generateImage(message)} className="bg-white p-2 rounded-[6px] text-slate-500 mt-[3%]">下載結果</button>

            <div className="flex flex-row w-full justify-center gap-8 pt-[9%] pb-[5%] items-center">
            <a href="https://www.instagram.com/babyt777/" className="flex flex-row gap-2 items-center" target="_blank">
                <NextImage src={"/images/Instagram_icon.png.webp"} width={14} height={14} alt="instagram:"/>
                <div className="text-gray-600/75 font-[monospace] text-xs">Duckmouth_B</div>
            </a>
            <a href="/" className="flex flex-row gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
            </svg>
                <div className="text-gray-600/75 font-[monospace] text-xs">再測一次</div>
            </a>
            </div>
        </div>
    );
}