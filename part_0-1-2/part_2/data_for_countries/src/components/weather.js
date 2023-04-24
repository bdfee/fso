import Fact from './fact'
import Image from './image'

export const Weather = ({ weather, capital }) => {

  const { temp, icon, wind } = weather

  const iconAltText = `Icon depicting the weather in ${capital}`

  return (
    <>
      <h3>weather in {capital}</h3>
      <Fact title='temperature' fact={temp} scale='degrees fahrenheit'/>
      <Image src={icon} alt={iconAltText}/>
      <Fact title='wind' fact={wind} scale='miles per hour'/>
    </>
  )
}

export default Weather
