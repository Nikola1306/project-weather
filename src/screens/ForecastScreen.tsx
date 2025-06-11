import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { ForecastItem } from '../components/ForecastItem';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { weatherApi } from '../services/weatherApi';
import { ForecastWeatherResponse, ForecastDay } from '../types/weather';
import { useTheme } from '../theme';

export default function ForecastScreen() {
  const theme = useTheme();
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentCity, setCurrentCity] = useState('London');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  const fetchForecast = async (city: string = currentCity) => {
    try {
      setError(null);
      const data = await weatherApi.getForecast(city, 3);
      setForecast(data);
      setCurrentCity(city);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch forecast data');
      setForecast(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (city: string) => {
    setLoading(true);
    fetchForecast(city);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchForecast();
  };

  const handleRetry = () => {
    setLoading(true);
    fetchForecast();
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const renderForecastItem = ({ item }: { item: ForecastDay }) => (
    <ForecastItem forecast={item} tempUnit={tempUnit} />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 16,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textMuted,
    },
    list: {
      flex: 1,
      paddingBottom: 20,
    },
  });

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingSpinner message="Loading forecast..." />
      </SafeAreaView>
    );
  }

  if (error && !forecast) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SearchBar onSearch={handleSearch} />
          <ErrorMessage
            title="Forecast Unavailable"
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
        {forecast && (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>
                {forecast.location.name}, {forecast.location.country}
              </Text>
              <Text style={styles.subtitle}>3-Day Forecast</Text>
            </View>
            <FlatList
              style={styles.list}
              data={forecast.forecast.forecastday}
              renderItem={renderForecastItem}
              keyExtractor={(item) => item.date}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  tintColor={theme.primary}
                  colors={[theme.primary]}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
