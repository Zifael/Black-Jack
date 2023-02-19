import { useCallback, useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsBot, getSumBot } from '../utils/selectors/selectors'
import { AppDispatch } from '../redux/store'
import { setCardsBot, setSumBot } from '../redux/Cards/cardsSlice'



interface IProps {
  playerFinishidTurn: boolean
}

export function BotPlayer({playerFinishidTurn}: IProps) {  
  
  const cardsBot = useSelector(getCardsBot)
  const sumCardsBot =  useSelector(getSumBot)
  const dispatch = useDispatch<AppDispatch>()  

  

  useEffect(() => {    
    for (let i = 0; i < 2; i++) {
      dispatch(setCardsBot())
    }         
  }, [])
  
  useEffect(() => {
    dispatch(setSumBot())        
  }, [cardsBot])  

  useEffect(() => {
    // When the player has completed the game, the bot gets the cards if necessary 
    if (playerFinishidTurn && sumCardsBot < 18) {
      dispatch(setCardsBot())
    }
  }, [sumCardsBot, playerFinishidTurn])

  return (    
    <div>
      <div className='cardsBot'>
        {cardsBot.map( e => 
            <div key={e.id} className='card'>
                <span className='card__info'>
                  <span className='suit'>{e.suit}</span>
                  <span className='suit'>{e.name}</span>
                </span>
            </div>
        )}                 
      </div> 
      <div className='countCards'>Счет: {sumCardsBot}</div>     
    </div>     
  )
}

