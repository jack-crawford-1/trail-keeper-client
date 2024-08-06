import { useEffect, useState } from 'react';
import { FetchCurrentWeather } from '../../api/fetchWeather';
import WeatherData from '../../interface/weatherTypes';

export default function CurrentWeather(): JSX.Element | null {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchCurrentWeather();
      setWeatherData(data);
    };
    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { current } = weatherData;
  console.log(current);

  return (
    <div>
      <h2 className="font-bold m-3">Current Weather</h2>
      <div className="text-sm">
        <p>Temperature: {current.temperature_2m}°C</p>
        <p>Feels like: {current.apparent_temperature}°C</p>
        <p>Wind speed: {current.wind_speed_10m} m/s</p>
        <p>Wind direction: {current.winddirection_10m}°</p>
        <p>Wind gusts: {current.windgusts_10m} m/s</p>
        <p>Cloud cover: {current.cloudcover}%</p>
        <p>Relative humidity: {current.relative_humidity_2m}%</p>
        <p>Pressure: {current.pressure_msl} hPa</p>
        <p>Weather code: {current.weathercode}</p>
        <p>Time: {current.time}</p>
        <p>Is day?: {current.is_day}</p>
        <p>Dewpoint: {current.dewpoint_2m}°C</p>
        <p>Direct radiation: {current.direct_radiation} W/m²</p>
        <p>Interval: {current.interval} minutes</p>
        <p>Precipitation: {current.precipitation} mm</p>
        <p>Rain: {current.rain} mm</p>
        <p>Shortwave radiation: {current.shortwave_radiation} W/m²</p>
        <p>Showers: {current.showers} mm</p>
        <p>Snowfall: {current.snowfall} mm</p>
        <p>Surface pressure: {current.surface_pressure} hPa</p>
      </div>
    </div>
  );
}
