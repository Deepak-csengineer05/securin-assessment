# ⛅ SkyView — Real-Time Weather 
---

## Project Overview

SkyView lets you instantly check weather conditions for any city worldwide. It features:

- **City search** with live autocomplete suggestions (powered by Open-Meteo Geocoding API)
- **Geolocation** — detect and use your current position
- **Current conditions** — temperature, feels-like, weather icon, condition label, today's high/low
- **Today's Details panel** — humidity, wind speed & direction, pressure, visibility, precipitation, sunrise/sunset, max wind
- **24-Hour Forecast** — scrollable hourly strip with animated temperature bars and precipitation probability
- **7-Day Forecast** — daily high/low range bars with weather icons and precipitation totals

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 19 |
| Styling | Pure CSS |
| Weather data | Open-Meteo REST API |
| Geocoding | Open-Meteo Geocoding API |

---

## Setup & Run Instructions

### 1 — Clone / open the project

```bash
cd my-app
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # City search input with autocomplete
│   │   ├── CurrentWeather.jsx   # Main temperature/condition card
│   │   ├── WeatherDetails.jsx   # 8-stat detail grid (humidity, wind, etc.)
│   │   ├── HourlyChart.jsx      # 24-hour scrollable bar chart
│   │   └── Forecast.jsx         # 7-day forecast list with range bars
│   ├── hooks/
│   │   └── useWeather.js        # Custom hook — all API calls & state
│   ├── utils/
│   │   └── weatherUtils.js      # WMO code map, formatters, helpers
│   ├── App.jsx                  # Root component, layout orchestration
│   ├── App.css                  # All component styles
│   └── index.css                # Global reset & body defaults
├── index.html
├── vite.config.js
└── package.json
```

---

## API Details

### Weather data — Open-Meteo

| Property | Value |
|----------|-------|
| Provider | [Open-Meteo](https://open-meteo.com/) |
| Base URL | `https://api.open-meteo.com/v1/forecast` |

#### Endpoint used

```
GET https://api.open-meteo.com/v1/forecast
```

**Key query parameters:**

| Parameter | Description |
|-----------|-------------|
| `latitude`, `longitude` | Location coordinates |
| `current` | Comma-separated current fields (temperature, humidity, wind, etc.) |
| `hourly` | Hourly fields (temperature, weather code, precip probability) |
| `daily` | Daily fields (max/min temp, precip sum, sunrise/sunset, wind max) |
| `timezone` | Set to `auto` to use the location's local timezone |
| `forecast_days` | Number of forecast days (7 in this app) |

**Example request:**
```
https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto
```

---

### Geocoding — Open-Meteo Geocoding API

| Property | Value |
|----------|-------|
| Base URL | `https://geocoding-api.open-meteo.com/v1/search` |

**Usage:** Convert a city name to `latitude`/`longitude` for the weather request.

```
GET https://geocoding-api.open-meteo.com/v1/search?name=Mumbai&count=6&language=en&format=json
```

Returns an array of matching locations with `name`, `country`, `admin1`, `latitude`, `longitude`.

---
