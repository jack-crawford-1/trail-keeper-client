import RainSvgIcon from './icons/Rain'
import SunSvgIcon from './icons/Sun'
import PartlyRainySvgIcon from './icons/PartlyRainy'
import CloudSvgIcon from './icons/Cloud'

export default function Weather() {
  const weather = 'sunny'
  const temp = 15
  const wind = 40
  const humidity = 80

  return (
    <div>
      <h2 className="font-bold m-3">Weather</h2>
      <div className="text-sm">
        <p>Current weather: {weather}</p>
        <p>Temperature: {temp}°C</p>
        <p>Wind: {wind} km/h</p>
        <p>Humidity: {humidity}%</p>
      </div>
      <div className="pt-5">
        <h3 className="font-bold m-3">7 Day Forecast</h3>
        <div className="text-sm">
          <div>
            <PartlyRainySvgIcon />
            <RainSvgIcon />
            <SunSvgIcon />
            <CloudSvgIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
