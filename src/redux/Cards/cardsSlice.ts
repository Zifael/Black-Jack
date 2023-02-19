import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Icards } from "../../types/Icards";
import { setSumCards } from "../../utils/cardsRducer/setCardsPlayers";
import { AppDispatch } from "../store";


export interface cardsSliceState{    
    cards: Array<Icards>
    cardsBot: Array<Icards>
    cardsPlayer: Array<Icards>
    sumCardsBot: number
    sumCardsPlayer: number,   
}

export const initialState: cardsSliceState = {
    cards: [],
    cardsBot: [],
    cardsPlayer: [],
    sumCardsBot: 0,
    sumCardsPlayer: 0,    
}

const setCardPlayers = (state: typeof initialState, whoseCards: 'cardsBot' | 'cardsPlayer') => { 
    const randomIndex = Math.floor(Math.random() * state.cards.length) 
    const randomCard = state.cards[randomIndex]        
    state[whoseCards] = [...state[whoseCards], randomCard]
    state.cards = state.cards.filter(e => e.id !== randomCard.id)    
}

const cardsSlice = createSlice({
    name: 'cardsSlice',
    initialState,
    reducers: {
        setCards (state, action: PayloadAction<Icards[]>)  { 
            state.cards = [...state.cards, ...action.payload]                  
        },
        setCardsBot (state,) {
            setCardPlayers(state, 'cardsBot')             
        },
        setCardsMy (state) {                
            setCardPlayers(state, 'cardsPlayer')               
        },
        setSumBot (state) {
            state.sumCardsBot = setSumCards(state, "cardsBot",)           
        },
        setSumPlayers (state) {
            state.sumCardsPlayer = setSumCards(state, 'cardsPlayer',)
        }
    }
})

export const {setCards, setCardsBot, setCardsMy, setSumBot, setSumPlayers} = cardsSlice.actions 
export default cardsSlice.reducer




