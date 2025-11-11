export interface WeatherData {
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

export interface City {
  id: number;
  name: string;
  country: string;
}