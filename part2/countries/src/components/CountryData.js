import axios from 'axios'
import { useState, useEffect } from 'react'
import Weather from './Weather'

const BasicInfo = ({ country }) => <p>capital {country.capital}<br />population {country.population}</p>

const Languages = ({ country }) => {
  return (
    <div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>
    </div>
  )
}

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <BasicInfo country={country} />
      <Languages country={country} />
      <img 
        src={country.flag} 
        alt={country.name} 
        width="150"
      />
      {weather.current && <Weather weather={weather} />}
    </div>
  )
}

export default CountryData