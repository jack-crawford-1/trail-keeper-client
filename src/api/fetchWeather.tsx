import axios from 'axios'

export async function FetchCurrentWeather() {
  const response = await axios.get('http://localhost:3000/v1/weather')
  const data = response.data
  return data
}

export async function FetchSevenDayWeather() {
  const response = await axios.get('http://localhost:3000/v1/weatherseven')
  const data = response.data
  return data
}
