import { cardsSliceState } from "../../redux/Cards/cardsSlice"

export const setWin = (state: cardsSliceState) => {
    if (state.sumCardsPlayer ===  state.sumCardsBot ) {
        return 'Draw'
    } 
    else if (state.sumCardsPlayer > 21) {
        return 'Bot'
    } 
    else if (state.sumCardsBot > 21) {
        return 'Player'
    }
    else if (state.sumCardsPlayer > state.sumCardsBot) {
        return 'Player'
    }
    else {
        return 'Bot'
    } 
}