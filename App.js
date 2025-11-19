import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './constants/routes';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import VideoScreen from './screens/VideoScreen';
import ImageGalleryScreen from './screens/ImageGalleryScreen';
import ImageDetailScreen from './screens/ImageDetailScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ Routes.HOME }
        screenOptions={{ headerShown: true, }}
      >
        <Stack.Screen 
          name={Routes.HOME} 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name={Routes.CAMERA} 
          component={CameraScreen} 
          options={{ title: 'Camera', headerShown: false }}
        />
        <Stack.Screen 
          name={Routes.VIDEO} 
          component={VideoScreen} 
          options={{ title: 'Record Video', headerShown: true }}
        />
        <Stack.Screen 
          name={Routes.IMAGE_GALLERY} 
          component={ImageGalleryScreen}
          options={{ title: 'Image Gallery', headerShown: false }}
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