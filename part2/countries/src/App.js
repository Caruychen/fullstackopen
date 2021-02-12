import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filterCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(search.toLowerCase())
  })

  const showCountries = filterCountries.length > 10
    ? <div>Too many matches, specify another filter</div>
    : <Countries countries={filterCountries}/>

  return (
    <div>
      <Filter onChange={handleSearchChange}/>
      {showCountries}
    </div>
  );
}

export default App;
