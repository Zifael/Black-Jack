import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Icards } from "../../types/Icards";
import { AppDispatch } from "../store";

interface IPlayers {
    myCards: Array<Icards>,
    myCardsSum: number
}

export interface cardsSliceState{    
    cards: Array<Icards>
    cardsBot: Array<Icards>
    myCards: Array<Icards>
    sumCardsBot: number
    sumCardsUser: number,
    players: Array<IPlayers> | []
}

export const initialState: cardsSliceState = {
    cards: [],
    cardsBot: [
        {id: '1', count: 11, name: 'picke', suit: 'tuse', isAse: true},
        {id: '2', count: 11, name: 'bube', suit: 'tuse', isAse: true}
],
    myCards: [],
    sumCardsBot: 0,
    sumCardsUser: 0,
    players: []
}

const setCardPlayers = (state: typeof initialState, where: 'cardsBot' | 'myCards') => {
    for (let i = 0; i < 2; i++) {
        const randomCard = state.cards[Math.floor(Math.random() * state.cards.length)]        
        state[where] = [...state[where], randomCard]
        state.cards = state.cards.filter(e => e.id !== randomCard.id)
    }      
}

const cardsSlice = createSlice({
    name: 'cardsSlice',
    initialState,
    reducers: {
        setCards (state, action: PayloadAction<Icards[]>)  { 
            state.cards = [...state.cards, ...action.payload]                  
        },
        setCardsBot (state) {
            setCardPlayers(state, 'cardsBot')            
        },
        setCardsMy (state) {
            setCardPlayers(state, 'myCards')            
        },
        setSumBot (state) {
            let cardNumbers: Array<number> = []     

            state.cardsBot.forEach(card => { 
                cardNumbers.push(card.count)                      
                let cuurrentAmmount = cardNumbers.reduce((prev, current) => prev + current, 0)                        
                // if the amount is greater than 21 and there is an ace, then we change the ace amount by 1    
                if ( cuurrentAmmount > 21 && card.isAse === true) {
                    // We find ace by index
                    const indexAse = cardNumbers.indexOf(11)     
                    // Change the ace amount to 1          
                    cardNumbers.splice(indexAse, 1, 1)               
                }                  
            })            
            state.sumCardsBot = cardNumbers.reduce((prev, current) => prev + current, 0)            
        }
    }
})

export const {setCards, setCardsBot, setCardsMy, setSumBot} = cardsSlice.actions 
export default cardsSlice.reducer




