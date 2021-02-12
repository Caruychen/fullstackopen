import Country from './Country'

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length > 1) {
    return (
      <div>{countries.map(country => <p key={country.name}>{country.name}</p>)}</div>
    )
  }
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  }
  return <p>No matches found, specify another filter</p>
}

export default Countries