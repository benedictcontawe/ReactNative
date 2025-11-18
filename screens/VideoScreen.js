import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../constants/theme';

export default function VideoScreen() {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>Video Screen</Text>
      <Text style={[styles.subtext, { color: theme.colors.textSecondary }]}>Record Video functionality will go here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
  },
});