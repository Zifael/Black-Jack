import { configureStore, combineReducers} from "@reduxjs/toolkit";
import cardRedcuer from "./Cards/cardsSlice";


const rootReducer  = combineReducers({
    cardRedcuer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch