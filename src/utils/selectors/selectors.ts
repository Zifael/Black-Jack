import { RootState } from "../../redux/store";


export const getCards = (state: RootState) =>  state.cardRedcuer.cards
export const getCardsBot = (state: RootState) => state.cardRedcuer.cardsBot
export const getCardsUser = (state: RootState) => state.cardRedcuer.myCards