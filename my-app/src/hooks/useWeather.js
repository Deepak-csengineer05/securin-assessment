import { useState, useCallback } from 'react';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const searchCities = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `${GEO_URL}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`
      );
      if (!res.ok) throw new Error('Geocoding failed');
      const data = await res.json();
      setSuggestions(data.results ?? []);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const fetchWeather = useCallback(async (lat, lon, name, country, admin1) => {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'is_day',
          'precipitation',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'surface_pressure',
          'visibility',
        ].join(','),
        hourly: ['temperature_2m', 'weather_code', 'precipitation_probability'].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'wind_speed_10m_max',
          'sunrise',
          'sunset',
        ].join(','),
        timezone: 'auto',
        forecast_days: 7,
      });

      const res = await fetch(`${WEATHER_URL}?${params}`);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      setWeather(data);
      setLocation({ name, country, admin1, lat, lon });
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(
    async (lat, lon) => {
      // Reverse geocode with Open-Meteo geocoding (no reverse, so use a fallback name)
      await fetchWeather(lat, lon, 'Your Location', '', '');
    },
    [fetchWeather]
  );

  return {
    weather,
    suggestions,
    loading,
    error,
    location,
    searchCities,
    fetchWeather,
    fetchByCoords,
    clearSuggestions: () => setSuggestions([]),
  };
}
