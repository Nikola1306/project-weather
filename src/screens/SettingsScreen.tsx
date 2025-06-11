import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Thermometer,
  Moon,
  Sun,
  Info,
  MapPin,
  Bell,
  Smartphone,
  Palette,
} from 'lucide-react-native';
import { useTheme, useThemeContext } from '../theme';

export default function SettingsScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme, isSystemTheme, setSystemTheme } =
    useThemeContext();
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingBottom: Platform.OS === 'ios' ? 104 : 84,
    },
    header: {
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.divider,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textMuted,
    },
    section: {
      backgroundColor: theme.card,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.divider,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.divider,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    settingIcon: {
      marginRight: 12,
    },
    settingContent: {
      flex: 1,
    },
    settingText: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 14,
      color: theme.textMuted,
    },
    tempButtons: {
      flexDirection: 'row',
      marginLeft: 'auto',
    },
    tempButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    tempButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    tempButtonText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    tempButtonTextActive: {
      color: '#FFFFFF',
    },
    themeControls: {
      marginLeft: 'auto',
      alignItems: 'flex-end',
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    themeText: {
      fontSize: 14,
      color: theme.textMuted,
      marginLeft: 8,
    },
    systemThemeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    systemThemeText: {
      fontSize: 12,
      color: theme.textMuted,
      marginRight: 8,
    },
    aboutSection: {
      margin: 16,
      padding: 16,
      backgroundColor: theme.surface,
      borderRadius: 12,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    aboutText: {
      fontSize: 14,
      color: theme.textMuted,
      lineHeight: 20,
      textAlign: 'center',
    },
    versionText: {
      fontSize: 12,
      color: theme.textMuted,
      textAlign: 'center',
      marginTop: 8,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your weather experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperature</Text>
          <View style={[styles.settingItem, styles.lastItem]}>
            <Thermometer
              size={20}
              color={theme.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Temperature Unit</Text>
              <Text style={styles.settingDescription}>
                Choose Celsius or Fahrenheit
              </Text>
            </View>
            <View style={styles.tempButtons}>
              <TouchableOpacity
                style={[
                  styles.tempButton,
                  tempUnit === 'C' && styles.tempButtonActive,
                ]}
                onPress={() => setTempUnit('C')}
              >
                <Text
                  style={[
                    styles.tempButtonText,
                    tempUnit === 'C' && styles.tempButtonTextActive,
                  ]}
                >
                  °C
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tempButton,
                  tempUnit === 'F' && styles.tempButtonActive,
                ]}
                onPress={() => setTempUnit('F')}
              >
                <Text
                  style={[
                    styles.tempButtonText,
                    tempUnit === 'F' && styles.tempButtonTextActive,
                  ]}
                >
                  °F
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={[styles.settingItem, styles.lastItem]}>
            <Palette
              size={20}
              color={theme.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Theme</Text>
              <Text style={styles.settingDescription}>
                {isSystemTheme ? 'Follows system setting' : 'Manual override'}
              </Text>
            </View>
            <View style={styles.themeControls}>
              <TouchableOpacity
                style={styles.themeToggle}
                onPress={toggleTheme}
              >
                {isDark ? (
                  <Moon size={16} color={theme.textMuted} />
                ) : (
                  <Sun size={16} color={theme.textMuted} />
                )}
                <Text style={styles.themeText}>
                  {isDark ? 'Dark' : 'Light'}
                </Text>
              </TouchableOpacity>
              <View style={styles.systemThemeRow}>
                <Text style={styles.systemThemeText}>Use System</Text>
                <Switch
                  value={isSystemTheme}
                  onValueChange={setSystemTheme}
                  trackColor={{ false: theme.border, true: theme.primary }}
                  thumbColor={isSystemTheme ? '#FFFFFF' : theme.textMuted}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions</Text>
          <View style={styles.settingItem}>
            <Bell size={20} color={theme.primary} style={styles.settingIcon} />
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Weather alerts and updates
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={notifications ? '#FFFFFF' : theme.textMuted}
            />
          </View>
          <View style={[styles.settingItem, styles.lastItem]}>
            <MapPin
              size={20}
              color={theme.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>Location Access</Text>
              <Text style={styles.settingDescription}>
                Auto-detect your location
              </Text>
            </View>
            <Switch
              value={location}
              onValueChange={setLocation}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={location ? '#FFFFFF' : theme.textMuted}
            />
          </View>
        </View>

        <View style={styles.aboutSection}>
          <View
            style={[
              styles.settingItem,
              { paddingHorizontal: 0, borderBottomWidth: 0 },
            ]}
          >
            <Info size={20} color={theme.primary} style={styles.settingIcon} />
            <View style={styles.settingContent}>
              <Text style={styles.settingText}>About WeatherNow</Text>
            </View>
          </View>
          <Text style={styles.aboutText}>
            WeatherNow provides accurate, real-time weather information and
            forecasts powered by WeatherAPI. Stay informed about current
            conditions and plan ahead with our detailed 3-day forecast.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
