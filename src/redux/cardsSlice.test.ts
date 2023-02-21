import { beforeEach, describe, expect, test} from "@jest/globals";
import { AnyAction } from "@reduxjs/toolkit";
import { creatingDeck } from '../utils/creatingDeck';
import { Icards } from '../types/Icards';
import cardRedcuer, {cardsSliceState, setCardsBot, setCards, setSumBot, setCardsMy, setWinner, setRestartGame} from './Cards/cardsSlice'

const state: cardsSliceState = {
    cards: [],
    cardsBot: [],
    cardsPlayer: [],
    sumCardsBot: 0,
    sumCardsPlayer: 0,
    win: null,
    isGameOn: false
}

describe('Set cards', () => {
         
    test('set cards in state', () => {
        const initialState: cardsSliceState = {...state, cards: []}
        const action = setCards()
        const newState = cardRedcuer(initialState, action)
        expect(newState.cards.length).toBe(52)       
    }) 
})

describe('Set cards for players', () => {     

    const setCardsPlayers = (whose: 'cardsBot' | 'cardsPlayer', action: AnyAction) => {
        let initialState: cardsSliceState
        const deck = creatingDeck()
        if ( whose === 'cardsBot' ) {
            initialState = {...state, cards: deck, cardsBot: []} 
        } else {
            initialState = {...state, cards: deck, cardsPlayer: []} 
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


describe('set winner', () => {    

    const setWinnerTest = (sumCardsBot: number, sumCardsPlayer: number, whose: 'Bot' | 'Player' | 'Draw') => { 
        const initialState = {...state, sumCardsBot, sumCardsPlayer}      
        const action = setWinner() 
        const newState = cardRedcuer(initialState, action)
        expect(newState.win).toBe(whose)
        
    }

    test ('win bot', () => {        
        setWinnerTest(21, 14, 'Bot')
    }) 

    test ('win player', () => {        
        setWinnerTest(18, 19, 'Player')
    })

    test('draw', () => {
        setWinnerTest(21, 21, 'Draw')
    })

    test('too many - Bot', () => {
        setWinnerTest(34, 15, 'Player')
    })

    test('too many - Player', () => {
        setWinnerTest(21, 26, 'Bot')
    })
})


