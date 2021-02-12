const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>
      <img src={country.flag} alt={country.name} width="150"/>
    </div>
  )
}

export default CountryData