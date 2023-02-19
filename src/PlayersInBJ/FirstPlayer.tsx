import { useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsUser, getSumPlayer } from '../utils/selectors/selectors'
import { AppDispatch } from '../redux/store'
import { setCardsMy, setSumPlayers } from '../redux/Cards/cardsSlice'






function LivePlayer() { 


  const cardsUser = useSelector(getCardsUser)
  const sumPlayer = useSelector(getSumPlayer)
  const dispatch = useDispatch<AppDispatch>()  

  

  useEffect(() => {            
    for (let i = 0; i < 2; i++) {      
      dispatch(setCardsMy()) 
    }        
  }, []) 

  useEffect(() => {     
    dispatch(setSumPlayers())
  }, [cardsUser])


  const getMoreCards = () => {
    dispatch(setCardsMy())
  }

  return (        
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
        <div>Счет: {sumPlayer}</div>
        <button onClick={getMoreCards}>еще</button>
        </div>    
  )
}

export default LivePlayer