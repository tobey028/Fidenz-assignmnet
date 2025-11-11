export interface WeatherResponse {
  id: number;
  name: string;
  tempC: number;
  tempF: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  fetchedAt: string;
}

export interface OpenWeatherAPIResponse {
  id: number;
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}