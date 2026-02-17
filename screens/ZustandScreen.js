import { View, Text, StyleSheet, Button } from 'react-native';
import { useCounterStore } from '../store/useCounterStore';

const ZustandScreen = () => {// Grab the count and the actions
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Count:</Text>
      <Text style={styles.countText}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title=" - " onPress={decrement} color="orange" />
        <Button title=" + " onPress={increment} />
      </View>
      <View style={styles.resetButton}>
        <Button title="Reset" onPress={reset} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    color: '#666',
  },
  countText: {
    fontSize: 80,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  resetButton: {
    width: 200,
  }
});

export default ZustandScreen;