import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({statistics}) => {
  if (statistics.all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text={"good"} value={statistics.good} />
          <Statistic text={"neutral"} value={statistics.neutral} />
          <Statistic text={"bad"} value={statistics.bad} />
          <Statistic text={"all"} value={statistics.all} />
          <Statistic text={"average"} value={statistics.average} />
          <Statistic text={"positive"} value={statistics.positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
  }

  const statistics = {
    good,
    neutral,
    bad,
    all: good + neutral + bad,
    get average() {return (good - bad) / this.all},
    get positive() {return ((good / this.all) * 100)+ "%"}
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text={"good"} />
      <Button handleClick={incrementNeutral} text={"neutral"} />
      <Button handleClick={incrementBad} text={"bad"} />
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)