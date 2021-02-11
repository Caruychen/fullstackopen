import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdote, points }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdote}
        <br />
        has {points} votes.
      </p>
    </div>
  )
}

const MostVoted= ({ anecdote }) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0)
  )
  
  const chooseRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }

  const incrementVote = () => {
    const tempPoints = [...points]
    tempPoints[selected] += 1
    setPoints(tempPoints)
  }

  const maxVotes = points.indexOf(Math.max(...points))

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={incrementVote} text={"vote"} />
      <Button handleClick={chooseRandomAnecdote} text={"next anecdote"} />
      <MostVoted anecdote={anecdotes[maxVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)