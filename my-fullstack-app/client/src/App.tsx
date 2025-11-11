import React, { useState } from 'react';
import { WeatherData } from './types';
import { WeatherCard } from './components/WeatherCard';
import { CitySelector } from './components/CitySelector';

function App() {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather?cityId=${cityId}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      setWeatherList((prev) => [...prev, data]);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeWeather = (id: number) => {
    setWeatherList((prev) => prev.filter((w) => w.id !== id));
  };

  const selectedCityIds = weatherList.map((w) => w.id);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>🌤️ Weather Dashboard</h1>
        <p style={styles.headerSubtitle}>
          Select cities to view real-time weather information
        </p>
      </header>

      <main style={styles.main}>
        <CitySelector
          onSelectCity={fetchWeather}
          selectedCities={selectedCityIds}
          loading={loading}
        />

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            Loading weather data...
          </div>
        )}

        <div style={styles.weatherGrid}>
          {weatherList.map((weather) => (
            <WeatherCard
              key={weather.id}
              weather={weather}
              onRemove={() => removeWeather(weather.id)}
            />
          ))}
        </div>

        {weatherList.length === 0 && !loading && (
          <div style={styles.empty}>
            <p>No cities selected yet. Choose a city above to see weather!</p>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '32px 16px',
    textAlign: 'center',
  },
  headerTitle: {
    margin: '0 0 8px 0',
    fontSize: '36px',
  },
  headerSubtitle: {
    margin: 0,
    fontSize: '16px',
    opacity: 0.9,
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  error: {
    background: '#fee',
    color: '#c33',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    padding: '16px',
    fontSize: '18px',
    color: '#667eea',
  },
  weatherGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '32px',
  },
  empty: {
    textAlign: 'center',
    padding: '48px 16px',
    fontSize: '18px',
    color: '#666',
  },
};

export default App;