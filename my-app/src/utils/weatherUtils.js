export const WMO_CODES = {
  0: { label: 'Clear Sky', icon: '☀️', bg: 'clear' },
  1: { label: 'Mainly Clear', icon: '🌤️', bg: 'clear' },
  2: { label: 'Partly Cloudy', icon: '⛅', bg: 'cloudy' },
  3: { label: 'Overcast', icon: '☁️', bg: 'cloudy' },
  45: { label: 'Fog', icon: '🌫️', bg: 'fog' },
  48: { label: 'Depositing Rime Fog', icon: '🌫️', bg: 'fog' },
  51: { label: 'Light Drizzle', icon: '🌦️', bg: 'rain' },
  53: { label: 'Moderate Drizzle', icon: '🌦️', bg: 'rain' },
  55: { label: 'Dense Drizzle', icon: '🌧️', bg: 'rain' },
  61: { label: 'Slight Rain', icon: '🌧️', bg: 'rain' },
  63: { label: 'Moderate Rain', icon: '🌧️', bg: 'rain' },
  65: { label: 'Heavy Rain', icon: '🌧️', bg: 'rain' },
  71: { label: 'Slight Snow', icon: '🌨️', bg: 'snow' },
  73: { label: 'Moderate Snow', icon: '❄️', bg: 'snow' },
  75: { label: 'Heavy Snow', icon: '❄️', bg: 'snow' },
  77: { label: 'Snow Grains', icon: '🌨️', bg: 'snow' },
  80: { label: 'Slight Showers', icon: '🌦️', bg: 'rain' },
  81: { label: 'Moderate Showers', icon: '🌧️', bg: 'rain' },
  82: { label: 'Violent Showers', icon: '⛈️', bg: 'storm' },
  85: { label: 'Slight Snow Showers', icon: '🌨️', bg: 'snow' },
  86: { label: 'Heavy Snow Showers', icon: '❄️', bg: 'snow' },
  95: { label: 'Thunderstorm', icon: '⛈️', bg: 'storm' },
  96: { label: 'Thunderstorm w/ Hail', icon: '⛈️', bg: 'storm' },
  99: { label: 'Thunderstorm w/ Heavy Hail', icon: '⛈️', bg: 'storm' },
};

export function getWeatherInfo(code) {
  return WMO_CODES[code] ?? { label: 'Unknown', icon: '🌡️', bg: 'clear' };
}

export function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export function getBackgroundClass(code, isDay) {
  if (!isDay) return 'bg-night';
  const info = getWeatherInfo(code);
  return `bg-${info.bg}`;
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDay(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
