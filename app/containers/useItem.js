//containers/useScore.js

'use client'
import { useEffect, useState, createContext, useContext } from "react";

const itemContext = createContext({
    scores: [],
    setScores: () => { },
    itemNum: 1,
    setItemNum: () => { },
    bgcolor: "",
    setBgcolor: () => { },
});

const useItemContext = () => useContext(itemContext);

const ItemContextProvider = ({ children }) => {

    const [scores, setScores] = useState([0, 0, 0, 0, 0, 0]); //用質數來計算，看餘數就知道是哪個角獸
    const [itemNum, setItemNum] = useState(1);
    const [bgcolor, setBgcolor] = useState("#9fa2d2");

    useEffect(() => {
        if (itemNum == 2)
            setBgcolor("#394265");
        else
            setBgcolor("#9fa2d2");
    } , [itemNum]);

    return (
        <itemContext.Provider
            value={{ scores, setScores, itemNum, setItemNum, bgcolor }}>
            {children}
        </itemContext.Provider>
    )
}
export { useItemContext, ItemContextProvider }