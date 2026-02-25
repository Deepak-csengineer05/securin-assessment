import { getWeatherInfo } from '../utils/weatherUtils';

export default function HourlyChart({ weather }) {
  const hourly = weather.hourly;
  const now = new Date();
  const startIdx = hourly.time.findIndex((t) => {
    const d = new Date(t);
    return d.toDateString() === now.toDateString() && d.getHours() >= now.getHours();
  });
  const idx = startIdx >= 0 ? startIdx : 0;
  const times = hourly.time.slice(idx, idx + 24);
  const temps = hourly.temperature_2m.slice(idx, idx + 24);
  const codes = hourly.weather_code.slice(idx, idx + 24);
  const probs = hourly.precipitation_probability?.slice(idx, idx + 24) ?? [];

  const min = Math.min(...temps), range = Math.max(...temps) - min || 1;
  const barH = (t) => ((t - min) / range) * 50 + 10;
  const fmt = (iso) => { const h = new Date(iso).getHours(); return h === 0 ? '12AM' : h === 12 ? '12PM' : h < 12 ? `${h}AM` : `${h - 12}PM`; };

  return (
    <div className="card">
      <h3 className="section-title">24-Hour Forecast</h3>
      <div className="hourly-scroll">
        {times.map((t, i) => {
          const info = getWeatherInfo(codes[i]);
          return (
            <div className="hourly-item" key={t}>
              <span className="hourly-time">{fmt(t)}</span>
              <span className="hourly-icon">{info.icon}</span>
              {probs[i] > 0 && <span className="hourly-precip">💧{probs[i]}%</span>}
              <div className="hourly-bar-wrap"><div className="hourly-bar" style={{ height: `${barH(temps[i])}px` }} /></div>
              <span className="hourly-temp">{Math.round(temps[i])}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
