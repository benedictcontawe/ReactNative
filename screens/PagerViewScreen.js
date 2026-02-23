import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

const PagerViewScreen = () => {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        {/* Page 1 */}
        <View key="1" style={[styles.page, { backgroundColor: '#ffefef' }]}>
          <Text style={styles.text}>Page 1: Welcome! 👋</Text>
          <Text style={styles.subText}>Swipe left to continue</Text>
        </View>
        {/* Page 2 */}
        <View key="2" style={[styles.page, { backgroundColor: '#efffef' }]}>
          <Text style={styles.text}>Page 2: Features 🚀</Text>
          <Text style={styles.subText}>Everything is smooth here</Text>
        </View>
        {/* Page 3 */}
        <View key="3" style={[styles.page, { backgroundColor: '#efefff' }]}>
          <Text style={styles.text}>Page 3: Finish 🎉</Text>
          <Text style={styles.subText}>You reached the end!</Text>
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Parent must have flex: 1
  },
  pagerView: {
    flex: 1, // PagerView must have flex: 1 to fill the container
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default PagerViewScreen;