import { getWeatherInfo, formatDay } from '../utils/weatherUtils';

export default function Forecast({ weather }) {
  const daily = weather.daily;
  const days = daily.time;

  const maxAll = Math.max(...daily.temperature_2m_max);
  const minAll = Math.min(...daily.temperature_2m_min);
  const range = maxAll - minAll || 1;

  function barOffset(min) {
    return ((min - minAll) / range) * 100;
  }
  function barWidth(min, max) {
    return ((max - min) / range) * 100;
  }

  return (
    <div className="forecast-section">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="forecast-list">
        {days.map((day, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          const tmax = Math.round(daily.temperature_2m_max[i]);
          const tmin = Math.round(daily.temperature_2m_min[i]);
          const precip = daily.precipitation_sum[i];
          const isToday = i === 0;

          return (
            <div className={`forecast-row ${isToday ? 'forecast-today' : ''}`} key={day}>
              <span className="forecast-day">{isToday ? 'Today' : formatDay(day)}</span>
              <span className="forecast-icon">{info.icon}</span>
              <span className="forecast-desc">{info.label}</span>
              {precip > 0 && (
                <span className="forecast-precip">💧 {precip.toFixed(1)}mm</span>
              )}
              <div className="forecast-bar-wrap">
                <span className="forecast-min">{tmin}°</span>
                <div className="forecast-bar-track">
                  <div
                    className="forecast-bar-fill"
                    style={{
                      left: `${barOffset(daily.temperature_2m_min[i])}%`,
                      width: `${barWidth(daily.temperature_2m_min[i], daily.temperature_2m_max[i])}%`,
                    }}
                  />
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
