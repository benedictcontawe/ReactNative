import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const listData = [
    { id: '1', Title: '100', details: '$0.99' },
    { id: '2', Title: '250', details: '$1.99' },
    { id: '3', Title: '500', details: '$3.99' },
    { id: '4', Title: '1000', details: '$7.99' },
    { id: '5', Title: '2000', details: '$14.99' },
    { id: '6', Title: '5000', details: '$34.99' },
];

const CellComponent = ({ item, isSelected, onPress }) => (
    <TouchableOpacity 
        style={[
          styles.itemContainer, 
          isSelected && styles.itemSelectedBorder
        ]}
        onPress={() => onPress(item.id)} >
        <Text style={styles.starIcon}>⭐</Text> 
        <Text style={styles.title}>{item.Title} coins</Text>
        <Text style={styles.details}>{item.details}</Text>
    </TouchableOpacity>
);

const FlatListScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          numColumns={3}                
          renderItem={({ item }) => (
            <CellComponent
              item={item}
              isSelected={false}
              onPress={() => {}} />
          )}
          contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#1E1E1E',
    },
    list: {
        justifyContent: 'flex-start',
    },
    itemContainer: {
        flex: 1, 
        margin: 5,
        padding: 10,
        backgroundColor: '#444',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    itemSelectedBorder: {
      borderWidth: 2,
      borderColor: '#FFD700', 
    },
    starIcon: {
      fontSize: 18,
      marginBottom: 5,
    },
    coinText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    priceText: {
      fontSize: 14,
      color: '#BBB',
      textAlign: 'center',
    },
});

export default FlatListScreen;