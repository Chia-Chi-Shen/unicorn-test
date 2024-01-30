'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Content from "./content"
import Option from "./option"
import { useItemContext } from "../containers/useItem"

                
                //1.太空人  2.寶寶  3.甜點師傅  4.拳擊手  5.科學家  6.芭蕾舞者

const items = [{text: <>你獲得一張藏寶圖，跟著藏寶圖的指示，你來到一個三叉路口前，<br/>你會選擇走：</>, 
                    options: ["清新明亮的花草步道", "散發奇異光澤的神秘叢林", "通往巨大瀑布的森林小徑"], targets: [[3, 5], [1, 2], [4, 5, 6]]},
                {text: <>走著走著，四週突然變得昏暗，<br/>這時出現一隻閃閃發光的小怪獸，<br/>你覺得他的意圖是：</>, 
                    options: ["擔心你在路途中遇到危險", "想跟你合作取得傳說中的寶藏", "對刺激的冒險旅程感到有興趣"], targets: [[2, 3], [2, 5, 6], [1, 4]]},
                {text: <>就在快要抵達寶藏山的山腳下時，你們突然掉進了一個陷阱裡，你仔細觀察了一下，發現這個陷阱充滿了：</>, 
                    options: ["兇狠的宇宙毒蛇", "讓人看不清四周的厚重雲霧", "隱藏的致命機關"], targets: [[3, 4, 6], [1, 2, 5], [5, 6]]},
                {text: <>就在你感到非常絕望的時候，突然一道亮光出現，回過神來你已經成功逃離陷阱，原來是小怪獸變成了：</>, 
                    options: ["擁有先進裝備的太空乳牛", "能夠高速飛行的飛天章魚", "展現超高智力的聰明熊熊"], targets: [[6], [1, 3, 4], [2, 5]]},
                {text: <>終於你們來到寶藏的藏匿處，只見眼前有一個厚實的木箱，好不容易打開寶藏箱後，發現裡面竟然是：</>, 
                    options: ["一張新的藏寶圖", "空無一物", "一隻陳舊的鋼筆"], targets: [[1, 2], [4, 5], [3, 6]]},
                {text: <>這時，有一隻天使角獸從箱子裡飛了出來，原來他才是真正的寶藏。現在你可以和天使許一個願望，你會：</>, 
                    options: ["和天使請求一小時的考慮時間", "說出自己直覺想到的第一個願望", "想要實現家人、朋友們的願望"], targets: [[3, 4, 5], [1, 2], [5, 6]]}]

export default function Items() {

    const { scores, setScores, itemNum, setItemNum, bgcolor } = useItemContext();  
    const [options, setOptions] = useState([]);
    const [test, setTest] = useState(<></>);
    const router = useRouter();

    const onClickOpt = (e, itemNum) => {
        const index = e.target.parentElement.parentElement.value;
        // console.log("index: ", index);
        // console.log(items[itemNum - 1].targets);
        const target = items[itemNum - 1].targets[index];
        target.map((idx) => {
            scores[idx - 1] += 1;
        })
        setScores(scores);
        // console.log("scores: ", scores)

        if (itemNum < 6)
            setItemNum(itemNum + 1);
        else
            router.push('/messages?data=' + scores.join(''));
    }

    useEffect(() => {
        setOptions(items[itemNum - 1].options);
        setTest(items[itemNum - 1].text);
    }, [itemNum])

    return (
        <div className={itemNum==2? "w-full h-full bg-[#394265] transition-colors delay-700 duration-500" : 
                                    "w-full h-full max-sm:bg-[#9fa2d2] max-sm:bg-[url('/images/item-bg.png')] bg-cover bg-center"}>
        <div className="container px-3 pt-[7vh] pb-[5vh] flex flex-col content-center w-full h-full">
            <Content text={test}/>
            {options.map((option, index) => 
            <button key={index} className='basis-auto' onClick={(e) => onClickOpt(e, itemNum)} value={index}>
                <Option text={option}/>
            </button>
            )}
            <Image className='px-20' src={`/images/item-img-${itemNum}.png`} priority alt="image" width={496} height={415}/>
        </div></div>
    )
};   