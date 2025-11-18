import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './constants/routes';
import HomeScreen from './components/HomeScreen'; // Corrected path
import CameraScreen from './components/CameraScreen';
import VideoScreen from './components/VideoScreen';
import ImageGalleryScreen from './components/ImageGalleryScreen';
import ImageDetailScreen from './components/ImageDetailScreen';

const Stack = createNativeStackNavigator();

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
          name={Routes.HOME} 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={Routes.CAMERA} component={CameraScreen} />
        <Stack.Screen name={Routes.VIDEO} component={VideoScreen} />
        <Stack.Screen 
          name={Routes.IMAGE_GALLERY} 
          component={ImageGalleryScreen}
          options={{ title: 'Image Gallery' }}
        />
        <Stack.Screen 
          name={Routes.IMAGE_DETAIL} 
          component={ImageDetailScreen}
          options={{ title: 'Image Detail', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}