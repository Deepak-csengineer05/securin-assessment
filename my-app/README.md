# ⛅ SkyView — Real-Time Weather App

A sleek, responsive weather application built with **React + Vite** that fetches and displays live weather data using the **Open-Meteo API** — completely free, no API key required.

---

## Project Overview

SkyView lets you instantly check weather conditions for any city worldwide. It features:

- **City search** with live autocomplete suggestions (powered by Open-Meteo Geocoding API)
- **Geolocation** — detect and use your current position
- **Current conditions** — temperature, feels-like, weather icon, condition label, today's high/low
- **Today's Details panel** — humidity, wind speed & direction, pressure, visibility, precipitation, sunrise/sunset, max wind
- **24-Hour Forecast** — scrollable hourly strip with animated temperature bars and precipitation probability
- **7-Day Forecast** — daily high/low range bars with weather icons and precipitation totals
- **Dynamic theming** — background gradient changes based on weather condition (clear/cloudy/rain/snow/storm/night)
- **Glassmorphism UI** with animated floating orbs and smooth entrance animations
- Fully **responsive** — works on desktop, tablet and mobile

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 19 |
| Bundler | Vite 7 |
| Styling | Pure CSS (glassmorphism + CSS animations) |
| Weather data | Open-Meteo REST API |
| Geocoding | Open-Meteo Geocoding API |
| No extra dependencies | ✅ (no UI library, no charting lib) |

---

## Setup & Run Instructions

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9 (comes with Node)

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

### 4 — Build for production

```bash
npm run build
```

The output is placed in `dist/`. Preview it with:

```bash
npm run preview
```

---

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
| License | Free for non-commercial use (CC BY 4.0) |
| Authentication | **None required** — no API key |
| Rate limits | None for reasonable usage |
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
| Authentication | None |

**Usage:** Convert a city name to `latitude`/`longitude` for the weather request.

```
GET https://geocoding-api.open-meteo.com/v1/search?name=Mumbai&count=6&language=en&format=json
```

Returns an array of matching locations with `name`, `country`, `admin1`, `latitude`, `longitude`.

---

### WMO Weather Codes

Open-Meteo uses [WMO Weather Interpretation Codes](https://open-meteo.com/en/docs) (integers 0–99) to describe conditions. `src/utils/weatherUtils.js` maps every code to a human-readable label, an emoji icon, and a background theme class.

---

## Screenshots

The UI dynamically changes its colour palette:

| Condition | Theme |
|-----------|-------|
| ☀️ Clear sky (day) | Deep blue gradient |
| 🌧️ Rain / drizzle | Dark navy gradient |
| ❄️ Snow | Grey-blue gradient |
| ⛈️ Thunderstorm | Near-black gradient |
| ☁️ Overcast | Slate gradient |
| 🌙 Night | Deep purple-indigo gradient |

---

## License

MIT — free to use and modify.

