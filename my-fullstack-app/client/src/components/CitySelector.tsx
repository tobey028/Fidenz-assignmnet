import React from 'react';
import { CITIES } from '../data/cities';

interface CitySelectorProps {
  onSelectCity: (cityId: number) => void;
  selectedCities: number[];
  loading: boolean;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ 
  onSelectCity, 
  selectedCities,
  loading 
}) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Cities to View Weather</h2>
      <div style={styles.grid}>
        {CITIES.map((city) => {
          const isSelected = selectedCities.includes(city.id);
          return (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              disabled={loading || isSelected}
              style={{
                ...styles.button,
                ...(isSelected ? styles.buttonSelected : {}),
              }}
            >
              {city.name}, {city.country}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
  },
  button: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #667eea',
    borderRadius: '8px',
    background: 'white',
    color: '#667eea',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  buttonSelected: {
    background: '#667eea',
    color: 'white',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
};