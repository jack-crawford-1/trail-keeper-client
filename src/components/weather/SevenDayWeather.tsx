import { useState, useEffect } from 'react';
import { FetchSevenDayWeather } from '../../api/fetchWeather';
import WeatherData from '../../interface/weatherTypes';
import IconSwitcher from './IconSwitcher';

export default function SevenDayWeather(): JSX.Element | null {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchSevenDayWeather();
      setWeatherData(data);
    };
    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { daily } = weatherData;

  return (
    <div className="bg-[#F5F5F5]">
      <div className="bg-[#FAFAFA] border-2 rounded-xl">
        <h2 className="font-bold m-3">7 day Forecast</h2>
        <div className="flex flex-col justify-center items-center">
          <ul>
            {daily.time.map((dateStr, index) => {
              const date = new Date(dateStr).toLocaleDateString('en-NZ', {
                weekday: 'long',
                day: 'numeric',
              });

              return (
                <li key={index}>
                  <div className="text-lg mb-[-15px] text-slate-900">
                    {date}
                  </div>
                  <div className="flex flex-row items-center">
                    <IconSwitcher weatherCode={daily.weathercode[index]} />
                    <div className="text-xl font-bold">
                      {daily.temperature_2m_max[index]}°C
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
