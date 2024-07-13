export default function Weather() {
  const weather = 'sunny'
  const temp = 15
  const wind = 40
  const humidity = 80

  const mon = 10
  const tue = 15
  const wed = 15
  const thu = 15
  const fri = 18
  const sat = 18
  const sun = 12

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
          <div className="m-2">Monday: {mon}°C</div>
          <div className="m-2">Tuesday: {tue}°C</div>
          <div className="m-2">Wednesday: {wed}°C</div>
          <div className="m-2">Thursday: {thu}°C</div>
          <div className="m-2">Friday: {fri}°C</div>
          <div className="m-2">Saturday: {sat}°C</div>
          <div className="m-2">Sunday: {sun}°C</div>
        </div>
      </div>
    </div>
  )
}
