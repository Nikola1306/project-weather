export interface Location {
  name: string;
  country: string;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  uv: number;
  visibility_km: number;
}

export interface CurrentWeatherResponse {
  location: Location;
  current: CurrentWeather;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: WeatherCondition;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
  };
}

export interface ForecastWeatherResponse {
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface WeatherError {
  error: {
    code: number;
    message: string;
  };
}