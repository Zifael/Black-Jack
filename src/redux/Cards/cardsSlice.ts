import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Icards } from "../../types/Icards";
import { AppDispatch } from "../store";

export interface cardsSliceState{    
    cards: Array<Icards>
    cardsBot: Array<Icards>
    myCards: Array<Icards>
    sumCardsBot: number
    sumCardsUser: number
}

export const initialState: cardsSliceState = {
    cards: [],
    cardsBot: [],
    myCards: [],
    sumCardsBot: 0,
    sumCardsUser: 0,
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
            const arrCount: Array<number> = []
            state.cardsBot.forEach(card => { 
                arrCount.push(card.count)
                if (arrCount.reduce((prev, current) => prev + current, 0) > 21 && card.isAse ) {
                    arrCount.map(e => e === 11 ? 1 : e)
                }           
            })
        }
    }
})

export const {setCards, setCardsBot, setCardsMy, setSumBot} = cardsSlice.actions 
export default cardsSlice.reducer


const setCardsThunks = (randomIndex: () => number) => (dispatch: AppDispatch) => {
    
    for (let i = 0; i < 2; i++) {
        const index = randomIndex()
        dispatch(setCardsBot())
    }    
    
}

