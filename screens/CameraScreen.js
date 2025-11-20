import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../constants/routes';
import { useTheme } from '../constants/theme';
import FlipIcon from '../components/FlipIcon';

export default function CameraScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [facing, setFacing] = useState(() => {
    try {//Use CameraType.back if available, otherwise fallback to string 'back'
      return CameraType?.back || 'back';
    } catch {
      return 'back';
    }
  });
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {    
    if (!permission?.granted) {// Request camera permission on mount
      requestPermission();
    }
  }, []);

  if (!permission) {//Camera permissions are still loading
    return <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]} />;
  }

  if (!permission.granted) {//Camera permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}>
        <Text style={[styles.message, { color: theme.colors.text }]}>We need your permission to show the camera</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttonPrimary }]} onPress={requestPermission}>
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    try { 
      if (CameraType && CameraType.back && CameraType.front) { //Check if CameraType is available
        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      } else { //Fallback to string values if CameraType enum is not available
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }
    } catch (error) { //Fallback to string values on error
      console.error('Error toggling camera facing:', error); 
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setCapturedImage(photo.uri);
        Alert.alert(
          'Photo Captured!',
          'What would you like to do?',
          [
            {
              text: 'Retake',
              onPress: () => setCapturedImage(null),
              style: 'cancel',
            },
            {
              text: 'Use This Photo',
              onPress: () => {// Navigate back with the image URI
                navigation.navigate(Routes.HOME, { capturedImage: photo.uri });
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture: ' + error.message);
      }
    }
  };

  if (capturedImage) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image source={{ uri: capturedImage }} style={styles.preview} />
        <View style={[styles.buttonContainer, { backgroundColor: theme.colors.headerBackground }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.buttonSecondary }]}
            onPress={() => setCapturedImage(null)}
          >
            <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.buttonPrimary }]}
            onPress={() => {
              navigation.navigate(Routes.HOME, { capturedImage });
            }}
          >
            <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="picture"
      >
        <View style={styles.overlay}>
          {/* Shutter Button - Centered, Large (40-60% width), 95% from top */}
          <TouchableOpacity
            style={styles.shutterButton}
            onPress={takePicture}
            activeOpacity={0.8}
          >
            <View style={[styles.shutterButtonOuter, { borderColor: theme.colors.border }]} />
          </TouchableOpacity>
          
          {/* Flip Button - Right side (85-95% width), aligned with shutter */}
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
            activeOpacity={0.8}
          >
            <FlipIcon size={60} color="#FFF" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  // Shutter Button - Large, centered (40-60% of screen width), bottom edge at 95% from top
  shutterButton: {
    position: 'absolute',
    left: '40%', // Start at 40% from left (40-60% = 20% width)
    width: '20%', // 40% to 60% = 20% width
    aspectRatio: 1, // Square (1:1 ratio)
    justifyContent: 'center',
    alignItems: 'center',
    // Bottom edge at 95% from top = 5% from bottom (matching XML guideline constraint)
    bottom: '5%',
  },
  shutterButtonOuter: {
    width: '100%',
    height: '100%',
    borderRadius: 999, // Fully circular
    backgroundColor: '#ffffff', // Solid white button (always white for camera)
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  // Flip Button - Right side (85-95% of screen width), top and bottom aligned with shutter
  flipButton: {
    position: 'absolute',
    right: '5%', // 5% from right edge (85-95% = 10% width, starting at 85%)
    width: '10%', // 85-95% = 10% width
    // Height matches shutter button (20% of screen width since shutter is square)
    height: Dimensions.get('window').width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // Bottom edge at same position as shutter button - 5% from bottom (95% from top)
    // This ensures bottom-to-bottom alignment
    bottom: '5%',
    // Top will automatically align since both have same bottom and same height
  },
  flipButtonBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  flipButtonIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  flipButtonImage: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});