import React from 'react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  onRemove: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRemove }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div style={styles.card}>
      <button onClick={onRemove} style={styles.closeBtn}>×</button>
      
      <h2 style={styles.cityName}>{weather.name}</h2>
      
      <img src={iconUrl} alt={weather.description} style={styles.icon} />
      
      <div style={styles.temp}>
        <span style={styles.tempLarge}>{weather.tempC}°C</span>
        <span style={styles.tempSmall}>({weather.tempF}°F)</span>
      </div>
      
      <p style={styles.description}>{weather.description}</p>
      
      <div style={styles.details}>
        <div>
          <span>💧 Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>
        <div>
          <span>💨 Wind</span>
          <strong>{weather.windSpeed} m/s</strong>
        </div>
      </div>
      
      <p style={styles.fetchedAt}>
        Updated: {new Date(weather.fetchedAt).toLocaleTimeString()}
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '16px',
    padding: '24px',
    minWidth: '280px',
    position: 'relative',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    margin: '0 0 16px 0',
    fontSize: '24px',
  },
  icon: {
    width: '100px',
    height: '100px',
    margin: '0 auto',
    display: 'block',
  },
  temp: {
    textAlign: 'center',
    marginBottom: '8px',
  },
  tempLarge: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  tempSmall: {
    fontSize: '18px',
    marginLeft: '8px',
    opacity: 0.8,
  },
  description: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: '18px',
    marginBottom: '16px',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px 0',
    borderTop: '1px solid rgba(255,255,255,0.3)',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
  },
  fetchedAt: {
    fontSize: '12px',
    opacity: 0.7,
    marginTop: '12px',
    textAlign: 'center',
  },
};