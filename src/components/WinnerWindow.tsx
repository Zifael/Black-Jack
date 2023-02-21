import React from 'react';
import { useDispatch } from 'react-redux';
import '../App.css'
import { setCards, setCardsBot, setCardsMy, setRestartGame } from '../redux/Cards/cardsSlice';

interface IProps {
  winner: string
  setPlayerFinishidTurn: (value: boolean) => void
}

function WinnerWindow({winner, setPlayerFinishidTurn}: IProps) {

  const dispatch = useDispatch()

  const restartGame = () => {
    // clearing the playing field
    dispatch(setRestartGame())
    // we pass the move back to the player
    setPlayerFinishidTurn(false)     
    
    // And we re-create the deck and give the cards to the players
    dispatch(setCards())
    for (let i = 0; i < 2; i ++) {
        dispatch(setCardsBot())
        dispatch(setCardsMy())
    }       
  }

  return (
    <div className={winner ? 'winner visibility' : 'winner'}>
      <div className='winner__block'>
        {winner === 'Draw' 
          ?
          <h2 className='winner__title'>{winner}</h2>
          :
          <h2 className='winner__title'>Победил {winner}</h2>
        }
        <button onClick={restartGame} className='winner__button'>Еще раз?</button>
      </div>
    </div>
  );
}

export default WinnerWindow;