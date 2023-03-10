import { Icards } from "../types/Icards"
import {v4 as uuid} from 'uuid'
import diamonds from '../img/diamonds.png'
import spades from '../img/spades.png'
import heart from '../img/heart.png'
import clubs from '../img/clubs.png'

export const creatingDeck = () => {  
  const cardsStart: Array<Icards> = []
   
    const cardSuit = [heart, clubs, diamonds, spades]
    const mainCards = ['Валет', 'Дама', 'Король', 'Туз']

    // Adding cards from 2 to 10
    for (let i = 1; i < 10; i++) {        
      cardSuit.forEach(suit => {  
          cardsStart.push({id: uuid(), name: `${i + 1}`, suit, count: i + 1})          
      })
    }     
    // Adding cards jack, queen, king, ace
    mainCards.forEach((name, i) => {
      cardSuit.forEach(suit => {
        if (name === 'Туз') {
          cardsStart.push({id: uuid(), name, suit, count: 11, isAse: true})
        } else {
          cardsStart.push({id: uuid(), name, suit, count: 10})
        }          
      }) 
    })    
  return cardsStart
}
