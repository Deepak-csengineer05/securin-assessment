import { getWeatherInfo, formatDay } from '../utils/weatherUtils';

export default function Forecast({ weather }) {
  const daily = weather.daily;
  const maxAll = Math.max(...daily.temperature_2m_max);
  const minAll = Math.min(...daily.temperature_2m_min);
  const range = maxAll - minAll || 1;

  return (
    <div className="card">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="forecast-list">
        {daily.time.map((day, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          const tmax = Math.round(daily.temperature_2m_max[i]);
          const tmin = Math.round(daily.temperature_2m_min[i]);
          const offset = ((daily.temperature_2m_min[i] - minAll) / range * 100).toFixed(1);
          const width = ((daily.temperature_2m_max[i] - daily.temperature_2m_min[i]) / range * 100).toFixed(1);
          return (
            <div className={`forecast-row${i === 0 ? ' forecast-today' : ''}`} key={day}>
              <span className="forecast-day">{i === 0 ? 'Today' : formatDay(day)}</span>
              <span className="forecast-icon">{info.icon}</span>
              <span className="forecast-desc">{info.label}</span>
              {daily.precipitation_sum[i] > 0 && <span className="forecast-precip">💧 {daily.precipitation_sum[i].toFixed(1)}mm</span>}
              <div className="forecast-bar-wrap">
                <span className="forecast-min">{tmin}°</span>
                <div className="forecast-bar-track">
                  <div className="forecast-bar-fill" style={{ left: `${offset}%`, width: `${width}%` }} />
                </div>
                <span className="forecast-max">{tmax}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
