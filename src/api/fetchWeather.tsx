import axios from 'axios'

export async function FetchWeather() {
  const response = await axios.get('http://localhost:3000/v1/weather')
  const data = response.data
  return data
}
