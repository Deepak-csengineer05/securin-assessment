import { getWeatherInfo } from '../utils/weatherUtils';

export default function CurrentWeather({ weather, location }) {
  const current = weather.current;
  const daily = weather.daily;
  const info = getWeatherInfo(current.weather_code);

  const todayMax = daily.temperature_2m_max[0];
  const todayMin = daily.temperature_2m_min[0];

  return (
    <div className="current-weather-card">
      <div className="current-location">
        <span className="location-pin">📍</span>
        <div>
          <h2 className="city-name">{location.name}</h2>
          <p className="city-meta">
            {[location.admin1, location.country].filter(Boolean).join(', ')}
          </p>
        </div>
      </div>

      <div className="current-main">
        <div className="weather-icon-large">{info.icon}</div>
        <div className="temp-block">
          <span className="current-temp">
            {Math.round(current.temperature_2m)}
            <span className="temp-unit">°C</span>
          </span>
          <span className="feels-like">
            Feels like {Math.round(current.apparent_temperature)}°C
          </span>
        </div>
      </div>

      <p className="weather-condition">{info.label}</p>

      <div className="temp-range">
        <span className="temp-max">⬆ {Math.round(todayMax)}°</span>
        <span className="temp-divider">|</span>
        <span className="temp-min">⬇ {Math.round(todayMin)}°</span>
      </div>
    </div>
  );
}
