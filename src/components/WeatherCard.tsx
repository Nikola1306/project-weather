import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MapPin, Wind, Droplets, Eye, Thermometer } from 'lucide-react-native';
import { CurrentWeatherResponse } from '../types/weather';
import { useTheme } from '../theme';
import { formatTemperature, getWeatherIcon, getUVIndexLabel } from '../utils/weatherUtils';

interface WeatherCardProps {
  weather: CurrentWeatherResponse;
  tempUnit: 'C' | 'F';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, tempUnit }) => {
  const theme = useTheme();
  const { location, current } = weather;

  const temperature = tempUnit === 'C' ? current.temp_c : current.temp_f;
  const feelsLike = tempUnit === 'C' ? current.feelslike_c : current.feelslike_f;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      margin: 16,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    locationText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginLeft: 8,
    },
    mainWeather: {
      alignItems: 'center',
      marginBottom: 24,
    },
    weatherIcon: {
      width: 80,
      height: 80,
      marginBottom: 8,
    },
    temperature: {
      fontSize: 48,
      fontWeight: 'bold',
      color: theme.text,
    },
    condition: {
      fontSize: 18,
      color: theme.textSecondary,
      marginTop: 4,
    },
    feelsLike: {
      fontSize: 14,
      color: theme.textMuted,
      marginTop: 4,
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      marginBottom: 12,
    },
    detailText: {
      marginLeft: 8,
      fontSize: 14,
      color: theme.textSecondary,
    },
    detailLabel: {
      fontSize: 12,
      color: theme.textMuted,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MapPin size={20} color={theme.primary} />
        <Text style={styles.locationText}>
          {location.name}, {location.country}
        </Text>
      </View>

      <View style={styles.mainWeather}>
        <Image
          source={{ uri: getWeatherIcon(current.condition) }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.temperature}>
          {formatTemperature(temperature, tempUnit)}
        </Text>
        <Text style={styles.condition}>{current.condition.text}</Text>
        <Text style={styles.feelsLike}>
          Feels like {formatTemperature(feelsLike, tempUnit)}
        </Text>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Wind size={16} color={theme.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.detailText}>{current.wind_kph} km/h</Text>
            <Text style={styles.detailLabel}>Wind</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Droplets size={16} color={theme.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.detailText}>{current.humidity}%</Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Eye size={16} color={theme.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.detailText}>{current.visibility_km} km</Text>
            <Text style={styles.detailLabel}>Visibility</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Thermometer size={16} color={theme.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.detailText}>{current.uv} {getUVIndexLabel(current.uv)}</Text>
            <Text style={styles.detailLabel}>UV Index</Text>
          </View>
        </View>
      </View>
    </View>
  );
};