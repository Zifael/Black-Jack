import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { creatingDeck } from './helpers/creatingDeck'
import { useDispatch, useSelector } from 'react-redux'
import { getCards } from './utils/selectors/selectors'
import { AppDispatch } from './redux/store'
import { setCards } from './redux/Cards/cardsSlice'
import { BotPlayer } from './PlayersInBJ/BotPlayer'
import LivePlayer from './PlayersInBJ/FirstPlayer'




function App() {   

  const [gameStart, setGameStart] = useState<boolean>(false)
  const [playerFinishidTurn, setPlayerFinishidTurn] = useState<boolean>(false)

  const cards = useSelector(getCards)

  const deck = useMemo(() => creatingDeck(), []) 
  
  const dispatch = useDispatch<AppDispatch>()  

  useEffect(() => {        
    dispatch(setCards(deck))             
  }, [])


 
 
  return (
    <div className="App">
      <section className='startGame'>
        <h1>Black Jack</h1>
        <button>Начать</button>
      </section>      
      <section className='pole'>
          {cards.length !==0 ? <BotPlayer playerFinishidTurn={playerFinishidTurn} /> : null}         
          {cards.length !==0 ? <LivePlayer /> : null}            
      </section>   
      <button onClick={() => setPlayerFinishidTurn(true)}>закончить ход</button>   
    </div>
  )
}

export default App
