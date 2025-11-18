import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { ImagePicker } from '../utils/imagePicker';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const navigation = useNavigation();
  // Use CameraType.back if available, otherwise fallback to string 'back'
  const [facing, setFacing] = useState(() => {
    try {
      return CameraType?.back || 'back';
    } catch {
      return 'back';
    }
  });
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Request camera permission on mount
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    if (!CameraType || !CameraType.back || !CameraType.front) return;
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
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
              onPress: () => {
                // Navigate back with the image URI
                navigation.navigate('Home', { capturedImage: photo.uri });
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture: ' + error.message);
      }
    }
  };

  const pickImageFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        Alert.alert(
          'Image Selected!',
          'What would you like to do?',
          [
            {
              text: 'Cancel',
              onPress: () => setCapturedImage(null),
              style: 'cancel',
            },
            {
              text: 'Use This Image',
              onPress: () => {
                navigation.navigate('Home', { capturedImage: result.assets[0].uri });
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedImage }} style={styles.preview} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.retakeButton]}
            onPress={() => setCapturedImage(null)}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.useButton]}
            onPress={() => {
              navigation.navigate('Home', { capturedImage });
            }}
          >
            <Text style={styles.buttonText}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            <View style={styles.shutterButtonOuter} />
          </TouchableOpacity>
          
          {/* Flip Button - Right side (85-95% width), aligned with shutter */}
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
            activeOpacity={0.8}
          >
            <View style={styles.flipButtonBackground}>
              <Text style={styles.flipButtonIcon}>🔄</Text>
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a', // darker_gray equivalent
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
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
    backgroundColor: '#ffffff', // Solid white button
    borderWidth: 4,
    borderColor: '#e0e0e0', // Light gray border for definition
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
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  flipButtonIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#000',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: '#666',
  },
  useButton: {
    backgroundColor: '#0066cc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});