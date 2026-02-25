import { useEffect } from 'react';
import './App.css';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyChart from './components/HourlyChart';
import Forecast from './components/Forecast';

export default function App() {
  const { weather, suggestions, loading, error, location, searchCities, fetchWeather, fetchByCoords, clearSuggestions } = useWeather();

  useEffect(() => { fetchWeather(28.6139, 77.209, 'New Delhi', 'India', 'Delhi'); }, [fetchWeather]);

  function handleGeolocate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => { }
    );
  }

  return (
    <div onClick={clearSuggestions}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <header>
          <h1>⛅ SkyView</h1>
          <p>Real-time weather at your fingertips</p>
        </header>

        <SearchBar onSearch={searchCities} onSelectSuggestion={fetchWeather}
          suggestions={suggestions} loading={loading} onGeolocate={handleGeolocate} />

        {loading && <div className="loading-state"><p>Loading...</p></div>}
        {error && !loading && <div className="error-card">⚠️ {error}</div>}

        {weather && location && !loading && (
          <div>
            <div className="top-row">
              <CurrentWeather weather={weather} location={location} />
              <WeatherDetails weather={weather} />
            </div>
            <HourlyChart weather={weather} />
            <Forecast weather={weather} />
          </div>
        )}

        <footer>
          <p>Data from <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</a></p>
        </footer>
      </div>
    </div>
  );
}
