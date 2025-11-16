import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { WeatherData } from '../types';
import { WeatherCard } from '../components/WeatherCard';
import { CitySelector } from '../components/CitySelector';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Weather state
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const fetchWeather = async (cityId: number) => {
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const response = await axios.get<WeatherData>(
        `http://localhost:5001/api/weather?cityId=${cityId}`
      );
      
      setWeatherData(prev => {
        const exists = prev.find(w => w.id === response.data.id);
        if (exists) return prev;
        return [...prev, response.data];
      });
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setWeatherError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setWeatherLoading(false);
    }
  };

  const removeWeather = (cityId: number) => {
    setWeatherData(prev => prev.filter(w => w.id !== cityId));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px',
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', color: '#333' }}>🌤️ Weather Dashboard</h1>
            <p style={{ margin: 0, color: '#666' }}>
              Welcome, <strong>{user?.firstName} {user?.lastName}</strong>!
            </p>
          </div>
          <button
            onClick={logout}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Logout
          </button>
        </div>

        {/* Weather Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          padding: '24px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Select Cities to View Weather</h2>
          
          {weatherError && (
            <div style={{ 
              background: '#fee', 
              color: '#c33', 
              padding: '12px', 
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              ❌ {weatherError}
            </div>
          )}

          <CitySelector
            onSelectCity={fetchWeather}
            selectedCities={weatherData.map(w => w.id)}
            loading={weatherLoading}
          />

          {weatherData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', margin: '20px 0' }}>
              No weather data yet. Select a city above to see the weather!
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              marginTop: '16px'
            }}>
              {weatherData.map((weather) => (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  onRemove={() => removeWeather(weather.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;