import { getWeatherInfo } from '../utils/weatherUtils';

export default function HourlyChart({ weather }) {
  const hourly = weather.hourly;
  const now = new Date();
  const currentHour = now.getHours();

  // Get next 24 hours starting from current hour
  const startIdx = hourly.time.findIndex((t) => {
    const h = new Date(t).getHours();
    const d = new Date(t).toDateString();
    return d === now.toDateString() && h >= currentHour;
  });

  const idx = startIdx >= 0 ? startIdx : 0;
  const times = hourly.time.slice(idx, idx + 24);
  const temps = hourly.temperature_2m.slice(idx, idx + 24);
  const codes = hourly.weather_code.slice(idx, idx + 24);
  const probs = hourly.precipitation_probability?.slice(idx, idx + 24) ?? [];

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  function barHeight(t) {
    return ((t - minTemp) / range) * 60 + 20;
  }

  function formatHour(iso) {
    const h = new Date(iso).getHours();
    if (h === 0) return '12AM';
    if (h === 12) return '12PM';
    return h < 12 ? `${h}AM` : `${h - 12}PM`;
  }

  return (
    <div className="hourly-section">
      <h3 className="section-title">24-Hour Forecast</h3>
      <div className="hourly-scroll">
        {times.map((t, i) => {
          const info = getWeatherInfo(codes[i]);
          const height = barHeight(temps[i]);
          return (
            <div className="hourly-item" key={t}>
              <span className="hourly-time">{formatHour(t)}</span>
              <span className="hourly-icon">{info.icon}</span>
              {probs[i] != null && probs[i] > 0 && (
                <span className="hourly-precip">💧{probs[i]}%</span>
              )}
              <div className="hourly-bar-wrap">
                <div
                  className="hourly-bar"
                  style={{ height: `${height}px` }}
                />
              </div>
              <span className="hourly-temp">{Math.round(temps[i])}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
