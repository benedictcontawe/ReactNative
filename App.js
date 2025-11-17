import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CameraScreen from './components/CameraScreen';
import VideoScreen from './components/VideoScreen';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleImagePress = () => {
    setBottomSheetVisible(true);
  };

  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const handleTakePhoto = () => {
    handleClose();
    navigation.navigate('Camera');
  };

  const handleRecordVideo = () => {
    handleClose();
    navigation.navigate('Video');
  };

  const handleChoosePhoto = () => {
    console.log('Choose Photo pressed');
    handleClose();
    // Add your choose photo logic here
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CameraApp</Text>
      </View>
      {/* Main Content Area */}
      <View style={styles.content}>
        <Pressable onPress={handleImagePress} style={styles.imageContainer}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.centerImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      {/* Bottom Sheet Modal */}
      <Modal
        visible={bottomSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>Camera X</Text>
            
            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={handleRecordVideo}
            >
              <Text style={styles.buttonText}>Record Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={handleChoosePhoto}
            >
              <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },
  header: {
    backgroundColor: '#000000',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerImage: {
    width: 150,
    height: 150,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomSheetButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  cancelButtonText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: '500',
  },
});