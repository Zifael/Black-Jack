import { useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsBot, getSumBot, getSumPlayer } from '../utils/selectors/selectors'
import { AppDispatch } from '../redux/store'
import { setCardsBot, setSumBot, setWinner } from '../redux/Cards/cardsSlice'



interface IProps {
  playerFinishidTurn: boolean
}

export function BotPlayer({playerFinishidTurn}: IProps) {  
  
  const cardsBot = useSelector(getCardsBot)
  const sumCardsBot =  useSelector(getSumBot)
  const sumCardsPlayer = useSelector(getSumPlayer)

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
    // When the player completes the game and the amount is less than 18, 
    // and the sum of the bot's cards is less or equal than the amount of the player's cards, 
    // the bot will receive cards, if necessary
    if ( playerFinishidTurn && sumCardsBot < 18 && sumCardsBot <= sumCardsPlayer ) {
      dispatch(setCardsBot())
    } else if ( playerFinishidTurn ) {
      // The bot does the last actions and we will find out who won
      dispatch(setWinner())
    }
  }, [sumCardsBot, playerFinishidTurn, sumCardsPlayer])

  return (    
    <div>
      <div className='cardsBot'>
        {cardsBot.map( e => 
            <div key={e.id} className='card'>
                <span className='card__info'>
                  <img  className='suit' src={e.suit} />
                  <span className='cards'>{e.name}</span>
                </span>
            </div>
        )}                 
      </div> 
      <div className='countCards'>Счет: {sumCardsBot}</div>     
    </div>     
  )
}

