import { useEffect } from 'react';
import './App.css';
import { useWeather } from './hooks/useWeather';
import { getBackgroundClass } from './utils/weatherUtils';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyChart from './components/HourlyChart';
import Forecast from './components/Forecast';

function App() {
  const {
    weather,
    suggestions,
    loading,
    error,
    location,
    searchCities,
    fetchWeather,
    fetchByCoords,
    clearSuggestions,
  } = useWeather();

  // Default city on first load
  useEffect(() => {
    fetchWeather(28.6139, 77.209, 'New Delhi', 'India', 'Delhi');
  }, [fetchWeather]);

  function handleGeolocate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {}
    );
  }

  const isDay = weather?.current?.is_day ?? 1;
  const weatherCode = weather?.current?.weather_code ?? 0;
  const bgClass = getBackgroundClass(weatherCode, isDay);

  return (
    <div className={`app ${bgClass}`} onClick={clearSuggestions}>
      {/* Animated background particles */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="app-header">
          <div className="logo-mark">
            <span className="logo-icon">⛅</span>
            <span className="logo-text">SkyView</span>
          </div>
          <p className="app-tagline">Real-time weather at your fingertips</p>
        </header>

        {/* Search */}
        <SearchBar
          onSearch={searchCities}
          onSelectSuggestion={fetchWeather}
          suggestions={suggestions}
          loading={loading}
          onGeolocate={handleGeolocate}
        />

        {/* Loading state */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Fetching weather data…</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="error-card">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Weather content */}
        {weather && location && !loading && (
          <div className="weather-content">
            <div className="top-row">
              <CurrentWeather weather={weather} location={location} />
              <WeatherDetails weather={weather} />
            </div>
            <HourlyChart weather={weather} />
            <Forecast weather={weather} />
          </div>
        )}

        <footer className="app-footer">
          <p>
            Data provided by{' '}
            <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">
              Open-Meteo
            </a>{' '}
            — Free & Open Source Weather API
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
