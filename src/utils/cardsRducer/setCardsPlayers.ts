import { cardsSliceState } from "../../redux/Cards/cardsSlice"

export const setSumCards = (
    state: cardsSliceState, 
    whoseCards: 'cardsBot' | 'cardsPlayer'   
): number => {
    let cardNumbers: Array<number> = []   
      
    state[whoseCards].forEach(card => { 

        cardNumbers.push(card.count) 

        const counting = () => {

            let getCuurrentAmmount = () => cardNumbers.reduce((prev, current) => prev + current, 0) 

            // Are there any more aces equal to eleven
            const isAcesEqualElevan = () => cardNumbers.some(amount => amount === 11)    

            // if the amount is greater than 21 and
            // are there any more aces equal to eleven ,
            // then we change the nominal sum of the ace to 1          
            if ( getCuurrentAmmount() > 21 &&  isAcesEqualElevan() ) {
                // We find ace by index
                const indexAse = cardNumbers.indexOf(11)                       
                // Change the ace amount to 1          
                cardNumbers.splice(indexAse, 1, 1) 

                // If the sum is still greater than 21 and there are unchanged aces, 
                // we call the function again to change the aces                      
                if (getCuurrentAmmount() > 21 && isAcesEqualElevan()) {
                    counting()
                }           
            }           
        }    
        counting()                 
    })       
    return cardNumbers.reduce((prev, current) => prev + current, 0)
}