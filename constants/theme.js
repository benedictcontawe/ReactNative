import { useColorScheme } from 'react-native';

// Light mode colors
export const lightColors = {
  // Background colors
  background: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  backgroundTertiary: '#e8e8e8',
  // Surface colors
  surface: '#ffffff',
  surfaceSecondary: '#f0f0f0',
  // Header/Navigation colors
  headerBackground: '#ffffff',
  headerText: '#000000',
  // Text colors
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#ffffff',
  // Button colors
  buttonPrimary: '#0066cc',
  buttonSecondary: '#666666',
  buttonSuccess: '#00aa44',
  buttonDanger: '#ff4444',
  buttonText: '#ffffff',
  // Border colors
  border: '#e0e0e0',
  borderSecondary: '#cccccc',
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
  // Status bar
  statusBar: 'dark',
};
// Dark mode colors
export const darkColors = {
  // Background colors
  background: '#000000',
  backgroundSecondary: '#1a1a1a',
  backgroundTertiary: '#2a2a2a',
  // Surface colors
  surface: '#1c1c1e',
  surfaceSecondary: '#2a2a2c',  
  // Header/Navigation colors
  headerBackground: '#000000',
  headerText: '#ffffff',  
  // Text colors
  text: '#ffffff',
  textSecondary: '#aaaaaa',
  textTertiary: '#888888',
  textInverse: '#000000',  
  // Button colors
  buttonPrimary: '#0a84ff',
  buttonSecondary: '#666666',
  buttonSuccess: '#30d158',
  buttonDanger: '#ff453a',
  buttonText: '#ffffff',  
  // Border colors
  border: '#38383a',
  borderSecondary: '#48484a',  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',  
  // Status bar
  statusBar: 'light',
};
// Custom hook to get theme based on color scheme
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
};
// For backward compatibility, but components should use useTheme hook
export const getTheme = () => {
  // This function cannot use hooks, so it will return light theme by default
  // Components should use useTheme() hook instead
  return {
    colors: lightColors,
    isDark: false,
  };
};

export const lightTheme = { colors: lightColors, isDark: false };
export const darkTheme = { colors: darkColors, isDark: true };