import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { creatingDeck } from './helpers/creatingDeck'
import { useDispatch, useSelector } from 'react-redux'
import { getCards, getCardsBot, getCardsUser } from './utils/selectors/selectors'
import { AppDispatch } from './redux/store'
import { setCards, setCardsBot, setCardsMy } from './redux/Cards/cardsSlice'
import { setSum } from './helpers/setSum'




function App() { 
  const [sumCardsBot, setSumCardsBot] = useState<number>(0)
  const [sumCardsUser, setSumCardsUser] = useState<number>(0)
  const cards = useSelector(getCards)

  const deck = useMemo(() => creatingDeck(), [])
  
  
  const dispatch = useDispatch<AppDispatch>()  

  useEffect(() => {        
    dispatch(setCards(deck))
    dispatch(setCardsBot())       
    dispatch(setCardsMy())         
  }, [])

  const cardsBot = useSelector(getCardsBot)
  const cardsUser = useSelector(getCardsUser)
  
  useEffect(() => {
    const sumCardsBot = setSum(cardsBot)
    setSumCardsBot(sumCardsBot)     
  }, [cardsBot])
  
  
  useEffect(() => {    
    const sumCardsUser =  setSum(cardsUser)   
    setSumCardsUser(sumCardsUser)
  }, [cardsUser])
 
  return (
    <div className="App">      
      <section className='pole'>
          <span className='cardsBot'>
              {
                cardsBot.map( e => 
                    <div key={e.id} className='card'>
                      <span className='card__info'>
                        <span className='suit'>{e.suit}</span>
                        <span className='suit'>{e.name}</span>
                      </span>
                    </div>
                )
              }  
              <div>Счет: {sumCardsBot}</div>            
          </span>          
          <div className='myCards'>
            { 
              cardsUser.map(e => 
                <div key={e.id} className='card'>
                  <span className='card__info'>
                    <span className='suit'>{e.suit}</span>
                    <span className='suit'>{e.name}</span>
                  </span>
                </div>
              )
            }
            <div>Счет: {sumCardsUser}</div>
          </div>
      </section>      
    </div>
  )
}

export default App
