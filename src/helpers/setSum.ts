import { useSelector } from "react-redux";
import { Icards } from "../types/Icards";



export const setSum = (cards: Array<Icards>) => {    
    // console.log('render')
    
    return cards.reduce((prevValue, currentValue) => prevValue + currentValue.count, 0)
}