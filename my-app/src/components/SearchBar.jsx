import { useState, useRef, useEffect } from 'react';

export default function SearchBar({
  onSearch,
  onSelectSuggestion,
  suggestions,
  loading,
  onGeolocate,
}) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(val);
    }, 300);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  }

  function handleSelect(city) {
    setQuery(`${city.name}${city.admin1 ? ', ' + city.admin1 : ''}, ${city.country}`);
    onSelectSuggestion(city.latitude, city.longitude, city.name, city.country, city.admin1);
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city, e.g. Mumbai, London, New York..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="search-input"
          autoComplete="off"
        />
        {loading && <span className="search-spinner" />}
        <button
          className="geolocate-btn"
          onClick={onGeolocate}
          title="Use my location"
          aria-label="Use my location"
        >
          📍
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, i) => (
            <li
              key={`${city.name}-${city.latitude}-${i}`}
              className="suggestion-item"
              onClick={() => handleSelect(city)}
            >
              <span className="suggestion-name">
                {city.name}
                {city.admin1 ? <span className="suggestion-region">, {city.admin1}</span> : null}
              </span>
              <span className="suggestion-country">{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
