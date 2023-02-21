import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Icards } from "../../types/Icards";
import { setSumCards } from "../../utils/cardsRducer/setCardsPlayers";
import { setWin } from "../../utils/cardsRducer/setWin";
import { creatingDeck } from "../../utils/creatingDeck";


export interface cardsSliceState{    
    cards: Array<Icards>
    cardsBot: Array<Icards>
    cardsPlayer: Array<Icards>
    sumCardsBot: number
    sumCardsPlayer: number,   
    win: 'Bot' | 'Player' | 'Draw' | null,
    isGameOn: boolean
}

export const initialState: cardsSliceState = {
    cards: [],
    cardsBot: [],
    cardsPlayer: [],
    sumCardsBot: 0,
    sumCardsPlayer: 0, 
    win: null,
    isGameOn: false,   
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
        setCards (state)  { 
            const deck = creatingDeck()
            state.cards = [...state.cards, ...deck]                  
        },
        setCardsBot (state,) {
            setCardPlayers(state, 'cardsBot')             
        },
        setCardsMy (state) {                
            setCardPlayers(state, 'cardsPlayer')               
        },
        setSumBot (state) {
            state.sumCardsBot = setSumCards(state, "cardsBot")           
        },
        setSumPlayers (state) {
            state.sumCardsPlayer = setSumCards(state, 'cardsPlayer')
        },
        setWinner (state) {
            state.win = setWin(state)                                     
        },
        setIsGameOn(state) {
            state.isGameOn = !state.isGameOn
        },        
        setRestartGame(state) {
            Object.assign(state, initialState)            
        },        
    }
})



export const { setCards, setCardsBot, setCardsMy, setSumBot, setSumPlayers, setWinner, setIsGameOn, setRestartGame } = cardsSlice.actions 
export default cardsSlice.reducer

  



