import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ImagePicker, isAvailable } from './utils/imagePicker';
import CameraScreen from './components/CameraScreen';
import VideoScreen from './components/VideoScreen';
import ImageGalleryScreen from './components/ImageGalleryScreen';
import ImageDetailScreen from './components/ImageDetailScreen';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    // Check if an image was passed from navigation (from Camera or Gallery)
    if (route.params?.capturedImage) {
      setDisplayImage(route.params.capturedImage);
      // Clear the params to avoid showing the same image on next visit
      navigation.setParams({ capturedImage: undefined });
    }
  }, [route.params]);

  const handleImagePress = () => setBottomSheetVisible(true);

  const handleClose = () => setBottomSheetVisible(false);

  const handleTakePhoto = () => {
    handleClose();
    navigation.navigate('Camera');
  };

  const handleRecordVideo = () => {
    handleClose();
    navigation.navigate('Video');
  };

  const handleChoosePhoto = async () => {
    handleClose();
    
    if (!isAvailable) {
      Alert.alert(
        'Native Module Not Available',
        'The image picker requires a development build with native modules. Please rebuild the app using:\n\nnpx expo run:android\n\nor\n\neas build --profile development --platform android'
      );
      return;
    }
    
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to select images.'
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setDisplayImage(result.assets[0].uri);
        Alert.alert('Success', 'Image selected from gallery!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  const handleViewGallery = () => {
    handleClose();
    navigation.navigate('ImageGallery', { capturedImage: displayImage });
  };

  const handleClearImage = () => {
    Alert.alert(
      'Clear Image',
      'Remove the displayed image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => setDisplayImage(null),
        },
      ]
    );
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
        {displayImage ? (
          <View style={styles.imageDisplayContainer}>
            <Pressable onPress={handleImagePress} style={styles.imageContainer}>
              <Image
                source={{ uri: displayImage }}
                style={styles.displayedImage}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.imageActionButton}
                onPress={handleClearImage}
              >
                <Text style={styles.imageActionText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageActionButton}
                onPress={handleViewGallery}
              >
                <Text style={styles.imageActionText}>View Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Pressable onPress={handleImagePress} style={styles.imageContainer}>
            <Image
              source={require('./assets/icon.png')}
              style={styles.centerImage}
              resizeMode="contain"
            />
            <Text style={styles.placeholderText}>Tap to open camera options</Text>
          </Pressable>
        )}
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
            <Text style={styles.bottomSheetTitle}>Camera Expo</Text>
            
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

            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={handleViewGallery}
            >
              <Text style={styles.buttonText}>View Gallery</Text>
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
        <Stack.Screen 
          name="ImageGallery" 
          component={ImageGalleryScreen}
          options={{ title: 'Image Gallery' }}
        />
        <Stack.Screen 
          name="ImageDetail" 
          component={ImageDetailScreen}
          options={{ title: 'Image Detail', headerShown: false }}
        />
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
  imageDisplayContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  displayedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageActionButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 7.5,
  },
  imageActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholderText: {
    color: '#aaaaaa',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
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