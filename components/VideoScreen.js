import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VideoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Video Screen</Text>
      <Text style={styles.subtext}>Record Video functionality will go here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#666',
  },
});