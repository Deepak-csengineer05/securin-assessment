import { useState, useRef, useEffect } from 'react';

export default function SearchBar({ onSearch, onSelectSuggestion, suggestions, loading, onGeolocate }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleChange(e) {
    setQuery(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(e.target.value), 300);
  }

  function handleSelect(city) {
    setQuery(`${city.name}${city.admin1 ? ', ' + city.admin1 : ''}, ${city.country}`);
    onSelectSuggestion(city.latitude, city.longitude, city.name, city.country, city.admin1);
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search city..." value={query}
          onChange={handleChange} onKeyDown={(e) => e.key === 'Enter' && suggestions[0] && handleSelect(suggestions[0])}
          className="search-input" autoComplete="off" />
        {loading && <span>...</span>}
        <button className="geolocate-btn" onClick={onGeolocate} title="Use my location">📍</button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, i) => (
            <li key={`${city.name}-${city.latitude}-${i}`} className="suggestion-item" onClick={() => handleSelect(city)}>
              <span>{city.name}{city.admin1 && <span className="suggestion-region">, {city.admin1}</span>}</span>
              <span className="suggestion-country">{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
