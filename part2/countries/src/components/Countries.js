import Country from './Country'
import CountryData from './CountryData'

const Countries = ({countries}) => {
  const length = countries.length
  switch (true) {
    case length > 10:
      return <p>Too many matches, specify another filter</p>
    case length > 1:
      return (
        <div>
          {countries.map(country => 
            <Country key={country.name} country={country}/>
          )}
        </div>
      )
    case length === 1:
      return <CountryData country={countries[0]}/>
    default:
      return <p>No matches found, specify another filter</p>
  }
}

export default Countries