import {beforeEach, describe, expect, test} from "@jest/globals";
import { createRandomCards } from "../helpers/createRandomCards";
import { creatingDeck } from '../helpers/creatingDeck';
import { Icards } from '../types/Icards';
import cardRedcuer, {cardsSliceState, initialState, setCardsBot, setCards} from './Cards/cardsSlice'


describe('Card reducer', () => {
    const deck = creatingDeck()
    const state: cardsSliceState = {
        cards: [],
        cardsBot: [],
        myCards: [],
        sumCardsBot: 0,
        sumCardsUser: 0,
    }

    test('Creating deck', () => {
        expect(deck.length).toBe(52)
    })
        
    test('set cards in state', () => {
        const initialState: cardsSliceState = {...state, cards: []}
        const action = setCards(deck)
        const expectState: cardsSliceState = {...state, cards: deck}
        expect(cardRedcuer(initialState, action)).toEqual(expectState)       
    })

    test('set cards Bot', () => {        
        const stateCuurent: cardsSliceState = {
            cards: deck,
            cardsBot: [],
            myCards: [],
            sumCardsBot: 0,
            sumCardsUser: 0,
        }        
        const initialState :cardsSliceState = {...stateCuurent, cardsBot: []}
        const action = setCardsBot()       
        const expectState: cardsSliceState = {...stateCuurent, cardsBot: []}
        expect(cardRedcuer(initialState, action)).toEqual(expectState)
    })
})



