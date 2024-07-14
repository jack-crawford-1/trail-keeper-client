export default interface WeatherData {
  current: {
    apparent_temperature: number
    cloudcover: number
    dewpoint_2m: number
    direct_radiation: number
    interval: number
    is_day: number
    precipitation: number
    pressure_msl: number
    rain: number
    relative_humidity_2m: number
    shortwave_radiation: number
    showers: number
    snowfall: number
    surface_pressure: number
    temperature_2m: number
    time: string
    weathercode: number
    wind_speed_10m: number
    winddirection_10m: number
    windgusts_10m: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    weathercode: number[]
  }
}
