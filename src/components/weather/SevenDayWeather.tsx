import { useState, useEffect } from 'react'
import { FetchSevenDayWeather } from '../../api/fetchWeather'
import WeatherData from '../../interface/weatherTypes'

export default function SevenDayWeather(): JSX.Element | null {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchSevenDayWeather()
      setWeatherData(data)
    }
    fetchData()
  }, [])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  const { daily } = weatherData

  return (
    <div>
      <h2 className="font-bold m-3">7 day Forecast</h2>
      <ul>
        {daily.time.map((dateStr, index) => {
          const date = new Date(dateStr).toLocaleDateString('en-GB', {
            dateStyle: 'full',
          })
          return (
            <li key={index} className="text-sm">
              <div>{date}</div>
              <div>{daily.temperature_2m_max[index]}°C</div>
              <div>{daily.weathercode[index]}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
