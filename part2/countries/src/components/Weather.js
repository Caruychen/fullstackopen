const Weather = ({ weather }) => {
  const { location, current } = weather

  return (
    <div>
      <h2>Weather in {location.name}</h2>
      <p><b>temperature:</b> {current.temperature} Celsius</p>
      <img 
        src={current.weather_icons[0]} 
        alt={current.weather_descriptions}
      />
      <p><b>wind:</b> {current.wind_speed} kph direction {current.wind_dir}</p>
    </div>
  )
}

export default Weather