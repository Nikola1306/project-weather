import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from './colors';
import { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  setSystemTheme: (useSystem: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    const colorScheme = useColorScheme();
    return colorScheme === 'dark' ? darkTheme : lightTheme;
  }
  return context.theme;
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [manualTheme, setManualTheme] = useState<'light' | 'dark'>('light');

  const isDark = isSystemTheme
    ? systemColorScheme === 'dark'
    : manualTheme === 'dark';

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    if (isSystemTheme) {
      setIsSystemTheme(false);
      setManualTheme(systemColorScheme === 'dark' ? 'light' : 'dark');
    } else {
      setManualTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const setSystemTheme = (useSystem: boolean) => {
    setIsSystemTheme(useSystem);
    if (useSystem) {
      setManualTheme(systemColorScheme || 'light');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        isSystemTheme,
        setSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { lightTheme, darkTheme };
export type { Theme };
