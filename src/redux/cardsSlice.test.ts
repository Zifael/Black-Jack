import {afterAll, afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import { AnyAction } from "@reduxjs/toolkit";
import { createRandomCards } from "../helpers/createRandomCards";
import { creatingDeck } from '../helpers/creatingDeck';
import { Icards } from '../types/Icards';
import cardRedcuer, {cardsSliceState, initialState, setCardsBot, setCards, setSumBot, setSumPlayers, setCardsMy} from './Cards/cardsSlice'



describe('Set cards', () => {
    const state: cardsSliceState = {
        cards: [],
        cardsBot: [],
        cardsPlayer: [],
        sumCardsBot: 0,
        sumCardsPlayer: 0,    
    }
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
})

describe('Set cards for players', () => {
    let state: cardsSliceState
    
        const deck = creatingDeck()
        state = {
            cards: deck,
            cardsBot: [],
            cardsPlayer: [],
            sumCardsBot: 0,
            sumCardsPlayer: 0,    
        }
    

    const setCardsPlayers = (whose: 'cardsBot' | 'cardsPlayer', action: AnyAction) => {
        let initialState: cardsSliceState
        if ( whose === 'cardsBot' ) {
            initialState = {...state, cardsBot: []} 
        } else {
            initialState = {...state, cardsPlayer: []} 
        }                   
        const newSwate: cardsSliceState = cardRedcuer(initialState, action)       
        expect(newSwate[whose]).not.toEqual([undefined])      
        expect(newSwate[whose].length).toBe(1) 
    }

    test('Set cards for the bot not null or array of undefined', () => {           
        const action = setCardsBot()                  
        setCardsPlayers('cardsBot', action)
    })   

    test('Set cards for the player not null or array of undefined', () => {          
        const action = setCardsMy()                
        setCardsPlayers('cardsPlayer', action)
    })  
})


describe('Checking all the tests with an ace in hand', () => {
    let state: cardsSliceState
    beforeEach(() => {
        state = {
            cards: [],
            cardsBot: [],
            cardsPlayer: [],
            sumCardsBot: 0,
            sumCardsPlayer: 0,    
        }
    })

    const testAce = (cards: Array<Icards>, exp: number) => {
        const initialState: cardsSliceState = {
            ...state, 
            sumCardsBot: 0,
            cardsBot: cards
        }
        const actionBot = setSumBot()        
        const newStateBot = cardRedcuer(initialState, actionBot) 
        expect(newStateBot.sumCardsBot).toBe(exp)        
    }

    test('The test  when the sum is 21 and the ace comes', () => {
        const cards: Array<Icards> = [                 
            {id: '1', count: 11, name: 'bube', suit: 'tuse', isAse: true}, 
            {id: '2', count: 10, name: 'bube', suit: 'king', isAse: false},  
            {id: '3', count: 11, name: 'bube', suit: 'tuse', isAse: true}, 
            {id: '4', count: 11, name: 'bube', suit: 'tuse', isAse: true},
            {id: '5', count: 11, name: 'bube', suit: 'tuse', isAse: true},
             
        ]
        testAce(cards, 14)
    })

    test('Dabl ace', () => {
        const cards: Array<Icards> = [            
            {id: '1', count: 11, name: 'bube', suit: 'tuse', isAse: true},     
            {id: '2', count: 11, name: 'bube', suit: 'tuse', isAse: true},
        ]
        testAce(cards, 12)
    })

    test('double ace in the starting hand', () => {
        const cards: Array<Icards> = [            
            {id: '1', count: 10, name: 'bube', suit: 'tuse', isAse: false},     
            {id: '2', count: 11, name: 'bube', suit: 'tuse', isAse: true},
        ]
        testAce(cards, 21)
    })

    test('default', () => {
        const cards: Array<Icards> = [            
            {id: '1', count: 11, name: 'bube', suit: 'tuse', isAse: true},           
            {id: '2', count: 8, name: 'bube', suit: 'tuse', isAse: false},
            {id: '3', count: 11, name: 'bube', suit: 'tuse', isAse: true},
            {id: '4', count: 7, name: 'bube', suit: 'tuse', isAse: false},
            {id: '5', count: 4, name: 'bube', suit: 'tuse', isAse: false},            
        ]
        testAce(cards, 21)
    })
})


