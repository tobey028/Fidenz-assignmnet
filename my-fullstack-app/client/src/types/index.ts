// Weather Types
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

// Auth & User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
