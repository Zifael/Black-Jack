
import { Icards } from "../types/Icards";



export const createRandomCards = (cards: Array<Icards>) => {    
    const randomIndex = Math.floor(Math.random() * cards.length)
    return randomIndex
}
    