import { useEffect, useState } from 'react'
import axios from 'axios'
import { kelvinToFahrenheit, mpsToMph } from '../utils'

import LanguageList from './language-list'
import Image from './image'
import Fact from './fact'
import Weather from './weather'

const api_key = process.env.REACT_APP_API_KEY

const FullCountry = (props) => {

  const [weather, setWeather] = useState({})
  const { name, capital, area, languages, flag, latlng } = props

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
    .then(({ data }) => {
        const formatWeather = {
          weather: data.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          temp: kelvinToFahrenheit(data.main.temp),
          wind: mpsToMph(data.wind.speed)
        }
        setWeather(formatWeather)
    })
  }, [])

  const flagAltText = `the national flag of ${name}`

  return (
    <>
      <h2>{name}</h2>
      <Fact title='capital' fact={capital} />
      <Fact title='area' fact={area} scale='square miles'/>
      <LanguageList languages={languages} />
      <Image src={flag} alt={flagAltText}/>
      {(Object.values(weather).length === 0)
        ? <div>when available, capital weather data will populate here</div>
        : <Weather weather={weather} capital={capital}/>
      }
    </>
  )
}

export default FullCountry
