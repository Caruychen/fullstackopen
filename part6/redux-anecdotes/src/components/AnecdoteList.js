import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementAnectode } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return [...state.anecdotes]
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => () => {
    dispatch(incrementAnectode(anecdote.id))
    dispatch(showNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList