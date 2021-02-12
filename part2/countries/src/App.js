import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'

const Filter = ({ onChange }) => <p>find countries <input onChange={onChange} /></p>

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

  return (
    <div>
      <Filter onChange={handleSearchChange}/>
      <Countries countries={filterCountries}/>
    </div>
  );
}

export default App;
