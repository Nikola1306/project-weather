import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CloudRain, Wind } from 'lucide-react-native';
import { ForecastDay } from '../types/weather';
import { useTheme } from '../theme';
import { formatTemperature, getWeatherIcon, formatDate } from '../utils/weatherUtils';

interface ForecastItemProps {
  forecast: ForecastDay;
  tempUnit: 'C' | 'F';
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ forecast, tempUnit }) => {
  const theme = useTheme();

  const maxTemp = tempUnit === 'C' ? forecast.day.maxtemp_c : forecast.day.maxtemp_f;
  const minTemp = tempUnit === 'C' ? forecast.day.mintemp_c : forecast.day.mintemp_f;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 4,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    date: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    condition: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    mainContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    weatherIcon: {
      width: 40,
      height: 40,
      marginRight: 12,
    },
    temperatureContainer: {
      alignItems: 'flex-start',
    },
    maxTemp: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    minTemp: {
      fontSize: 14,
      color: theme.textMuted,
    },
    rightSection: {
      alignItems: 'flex-end',
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    detailText: {
      fontSize: 12,
      color: theme.textMuted,
      marginLeft: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(forecast.date)}</Text>
        <Text style={styles.condition}>{forecast.day.condition.text}</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <Image
            source={{ uri: getWeatherIcon(forecast.day.condition) }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <View style={styles.temperatureContainer}>
            <Text style={styles.maxTemp}>
              {formatTemperature(maxTemp, tempUnit)}
            </Text>
            <Text style={styles.minTemp}>
              {formatTemperature(minTemp, tempUnit)}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.detailRow}>
            <CloudRain size={12} color={theme.textMuted} />
            <Text style={styles.detailText}>{forecast.day.daily_chance_of_rain}%</Text>
          </View>
          <View style={styles.detailRow}>
            <Wind size={12} color={theme.textMuted} />
            <Text style={styles.detailText}>{forecast.day.maxwind_kph} km/h</Text>
          </View>
        </View>
      </View>
    </View>
  );
};