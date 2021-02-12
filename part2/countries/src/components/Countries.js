import Country from './Country'

const Countries = ({ countries }) => {
  if (countries.length > 1) {
    return (
      <div>{countries.map(country => <p key={country.name}>{country.name}</p>)}</div>
    )
  }
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  return null
}

export default Countries