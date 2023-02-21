import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { creatingDeck } from './utils/creatingDeck'
import { useDispatch, useSelector } from 'react-redux'
import { getCards, getWiner } from './utils/selectors/selectors'
import { AppDispatch } from './redux/store'
import { setCards, setCardsMy } from './redux/Cards/cardsSlice'
import { BotPlayer } from './PlayersInBJ/BotPlayer'
import LivePlayer from './PlayersInBJ/FirstPlayer'
import WinnerWindow from './components/WinnerWindow'




function App() {   
  const dispatch = useDispatch<AppDispatch>()

  // It is necessary that the bot can receive cards after our turn, if it needs it
  const [playerFinishidTurn, setPlayerFinishidTurn] = useState<boolean>(false)

  const [gameStart, setGameStart] = useState<boolean>(false)

  const cards = useSelector(getCards)
    
  const winner = useSelector(getWiner) 
  

  useEffect(() => {        
    dispatch(setCards())             
  }, []) 

  const getMoreCards = () => {
    dispatch(setCardsMy())
  } 

  

  return (
    <div className="App">      
      {winner && <WinnerWindow winner={winner} setPlayerFinishidTurn={setPlayerFinishidTurn}/>}           
      {!gameStart ?
        <section className='startGame'>
          <div className='startGame__block'>
            <h1 className='startGame__title'>Black Jack</h1>
            <button className='startGame__button' onClick={() => setGameStart(true)}>Начать</button>
          </div>
        </section> 
        :
        <section className='pole'>            
          <div className='pole__block'>
            {cards.length !==0 ? <BotPlayer playerFinishidTurn={playerFinishidTurn} /> : null}         
            {cards.length !==0 ? <LivePlayer /> : null} 
          </div>  
          <div >
            <div className='pole__buttonBlock'>
              <button className='finishMove' onClick={() => setPlayerFinishidTurn(true)}>закончить ход</button>
            </div>
            <div className='pole__buttonBlock'>
              <button className='still' onClick={getMoreCards}>еще</button>
            </div>
          </div>                           
        </section> 
        
      }           
    </div>
  )
}

export default App
