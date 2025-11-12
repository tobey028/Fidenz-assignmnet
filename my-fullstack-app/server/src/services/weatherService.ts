import fetch from 'node-fetch';
import { OpenWeatherAPIResponse, WeatherResponse } from '../types';
import { cache } from '../utils/cache';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CACHE_TTL = parseInt(process.env.CACHE_TTL_MINUTES || '10');
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Debug log
console.log('🔑 API Key loaded:', API_KEY ? `${API_KEY.substring(0, 8)}...` : 'NOT FOUND');

export async function getWeatherByCityId(cityId: string): Promise<WeatherResponse> {
  const cacheKey = `weather:${cityId}`;
  const cached = cache.get<WeatherResponse>(cacheKey);
  
  if (cached) {
    console.log(`Cache hit for city ${cityId}`);
    return cached;
  }

  console.log(`Cache miss for city ${cityId}, fetching from API...`);

  const url = `${BASE_URL}?id=${cityId}&appid=${API_KEY}&units=metric`;
  console.log('📡 Fetching URL:', url.replace(API_KEY || '', 'API_KEY_HIDDEN'));
  
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API Error Response:', errorText);
    throw new Error(`OpenWeatherMap API error: ${response.status}`);
  }

  const data = await response.json() as OpenWeatherAPIResponse;

  const weather: WeatherResponse = {
    id: data.id,
    name: data.name,
    tempC: Math.round(data.main.temp),
    tempF: Math.round((data.main.temp * 9/5) + 32),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    fetchedAt: new Date().toISOString()
  };

  cache.set(cacheKey, weather, CACHE_TTL);

  return weather;
}