import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { weatherApi } from '../services/weatherApi';
import { CurrentWeatherResponse } from '../types/weather';
import { useTheme } from '../theme';

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentCity, setCurrentCity] = useState('London');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  const fetchWeather = async (city: string = currentCity) => {
    try {
      setError(null);
      const data = await weatherApi.getCurrentWeather(city);
      setWeather(data);
      setCurrentCity(city);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (city: string) => {
    setLoading(true);
    fetchWeather(city);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  const handleRetry = () => {
    setLoading(true);
    fetchWeather();
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      paddingBottom: 16,
    },
    scrollContainer: {
      flex: 1,
    },
  });

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingSpinner message="Fetching weather data..." />
      </SafeAreaView>
    );
  }

  if (error && !weather) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SearchBar onSearch={handleSearch} />
          <ErrorMessage
            title="Weather Unavailable"
            message={error}
            onRetry={handleRetry}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
        >
          {weather && <WeatherCard weather={weather} tempUnit={tempUnit} />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
