import { CurrentWeatherResponse, ForecastWeatherResponse, WeatherError } from '../types/weather';

const API_KEY = 'cdeb317ec6294f4e8db193908251106';
const BASE_URL = 'https://api.weatherapi.com/v1';

class WeatherApiError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const weatherApi = {
  async getCurrentWeather(city: string): Promise<CurrentWeatherResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
      );

      const data = await response.json();

      if (!response.ok) {
        const error = data as WeatherError;
        throw new WeatherApiError(error.error.code, error.error.message);
      }

      return data as CurrentWeatherResponse;
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }
      throw new WeatherApiError(0, 'Network error occurred');
    }
  },

  async getForecast(city: string, days: number = 3): Promise<ForecastWeatherResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=no&alerts=no`
      );

      const data = await response.json();

      if (!response.ok) {
        const error = data as WeatherError;
        throw new WeatherApiError(error.error.code, error.error.message);
      }

      return data as ForecastWeatherResponse;
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }
      throw new WeatherApiError(0, 'Network error occurred');
    }
  },
};