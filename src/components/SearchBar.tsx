import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '../theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for a city..." 
}) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginHorizontal: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      marginLeft: 12,
    },
    searchButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Search size={20} color={theme.textMuted} />
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
        <Search size={20} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};