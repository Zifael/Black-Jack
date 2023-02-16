import {beforeEach, describe, expect, test} from "@jest/globals";
import { createRandomCards } from "../helpers/createRandomCards";
import { creatingDeck } from '../helpers/creatingDeck';
import { Icards } from '../types/Icards';
import cardRedcuer, {cardsSliceState, initialState, setCardsBot, setCards, setSumBot} from './Cards/cardsSlice'

const state: cardsSliceState = {
    cards: [],
    cardsBot: [],
    myCards: [],
    sumCardsBot: 0,
    sumCardsUser: 0,
    players: []
}

describe('Card reducer', () => {
    const deck = creatingDeck()    

    test('Creating deck', () => {
        expect(deck.length).toBe(52)
    })
        
    test('set cards in state', () => {
        const initialState: cardsSliceState = {...state, cards: []}
        const action = setCards(deck)
        const expectState: cardsSliceState = {...state, cards: deck}
        expect(cardRedcuer(initialState, action)).toEqual(expectState)       
    })

    test('Set cards for the bot not null or array of undefined', () => {        
                    
        const initialState :cardsSliceState = {...state, cardsBot: [], cards: deck}
        const action = setCardsBot()       
        const expectState = {...state, cardsBot: [undefined, undefined]}
        expect(cardRedcuer(initialState, action)).not.toEqual(expectState)
        expect(cardRedcuer(initialState, action)).not.toEqual([])
    })   
})


describe('The set amount from the cards ', () => {
    test('The set amount from the double ace', () => {
        const dablTus: Array<Icards> = [
            {id: '1', count: 11, name: 'picke', suit: 'tuse', isAse: true},
            {id: '2', count: 11, name: 'bube', suit: 'tuse', isAse: true},     
        ]
        const initialState: cardsSliceState = {
            ...state, 
            sumCardsBot: 0,
            cardsBot: dablTus
        }
        const action = setSumBot()
        const newState = cardRedcuer(initialState, action)       
        
        expect(newState.sumCardsBot).toBe(12)
    })
})


