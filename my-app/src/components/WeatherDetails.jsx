import { getWindDirection, formatTime } from '../utils/weatherUtils';

function StatCard({ icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">
          {value}
          {unit && <span className="stat-unit"> {unit}</span>}
        </span>
      </div>
    </div>
  );
}

export default function WeatherDetails({ weather }) {
  const cur = weather.current;
  const daily = weather.daily;

  const sunrise = daily.sunrise?.[0];
  const sunset = daily.sunset?.[0];

  const stats = [
    { icon: '💧', label: 'Humidity', value: cur.relative_humidity_2m, unit: '%' },
    {
      icon: '💨',
      label: 'Wind',
      value: `${Math.round(cur.wind_speed_10m)} km/h ${getWindDirection(cur.wind_direction_10m)}`,
      unit: '',
    },
    { icon: '🌡️', label: 'Pressure', value: Math.round(cur.surface_pressure), unit: 'hPa' },
    {
      icon: '👁️',
      label: 'Visibility',
      value: cur.visibility != null ? (cur.visibility / 1000).toFixed(1) : 'N/A',
      unit: cur.visibility != null ? 'km' : '',
    },
    { icon: '🌧️', label: 'Precipitation', value: cur.precipitation, unit: 'mm' },
    {
      icon: '🌅',
      label: 'Sunrise',
      value: sunrise ? formatTime(sunrise) : '—',
      unit: '',
    },
    {
      icon: '🌇',
      label: 'Sunset',
      value: sunset ? formatTime(sunset) : '—',
      unit: '',
    },
    {
      icon: '🌬️',
      label: 'Max Wind',
      value: Math.round(daily.wind_speed_10m_max?.[0] ?? 0),
      unit: 'km/h',
    },
  ];

  return (
    <div className="details-section">
      <h3 className="section-title">Today's Details</h3>
      <div className="stats-grid">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}
