import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// 1. Define your Custom Sidebar component
const CustomSidebar = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.customSidebarContainer}>
        <Text style={styles.sidebarTitle}>My Custom Menu</Text>
      </View>
      {/* Renders the standard screen links */}
      <DrawerItemList {...props} /> 
      <TouchableOpacity 
        style={styles.customButton} 
        onPress={() => alert('Logout Pressed')}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
    customSidebarContainer: {
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    sidebarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    customButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
});

export default CustomSidebar;