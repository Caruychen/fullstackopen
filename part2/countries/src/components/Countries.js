import Country from './Country'
import CountryData from './CountryData'

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => 
          <Country key={country.name} country={country}/>
        )}
      </div>
    )
  }
  else if (countries.length === 1) {
    return (
      <CountryData country={countries[0]}/>
    )
  }
  return <p>No matches found, specify another filter</p>
}

export default Countries