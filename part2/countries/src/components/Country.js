import { useState } from 'react'
import CountryData from './CountryData'

const Country = ({ country }) => {
  const [isShowing, setIsShowing] = useState(false)

  const handleClick = () => {
    setIsShowing(!isShowing)
  }

  return (
    <div>
      <p>
        {country.name} <button onClick={handleClick}>{isShowing ? 'hide' : 'show' }</button>
      </p>
      {isShowing && <CountryData country={country}/>}
    </div>
  )
}

export default Country