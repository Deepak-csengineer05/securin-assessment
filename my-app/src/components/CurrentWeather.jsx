import { getWeatherInfo } from '../utils/weatherUtils';

export default function CurrentWeather({ weather, location }) {
  const cur = weather.current;
  const daily = weather.daily;
  const info = getWeatherInfo(cur.weather_code);

  return (
    <div className="card">
      <p className="city-meta">📍 {[location.name, location.admin1, location.country].filter(Boolean).join(', ')}</p>
      <h2 className="city-name">{location.name}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
        <span className="weather-icon-large">{info.icon}</span>
        <div>
          <div className="current-temp">{Math.round(cur.temperature_2m)}<span className="temp-unit">°C</span></div>
          <div className="feels-like">Feels like {Math.round(cur.apparent_temperature)}°C</div>
        </div>
      </div>
      <p className="weather-condition">{info.label}</p>
      <p className="temp-range">
        <span className="temp-max">↑ {Math.round(daily.temperature_2m_max[0])}°</span>
        <span className="temp-divider"> | </span>
        <span className="temp-min">↓ {Math.round(daily.temperature_2m_min[0])}°</span>
      </p>
    </div>
  );
}
