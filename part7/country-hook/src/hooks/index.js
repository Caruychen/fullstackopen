import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    name.length > 0 &&
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        setCountry({
          found: true,
          data: response.data[0]
        })
      })
      .catch(error => {
        setCountry({
          found: false,
          data: null
        })
      })
  }, [name])

  return country
}