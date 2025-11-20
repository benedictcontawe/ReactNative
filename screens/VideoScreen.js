import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useTheme } from '../constants/theme';
import FlipIcon from '../components/FlipIcon';
import RecordIcon from '../components/RecordIcon';
import RecordingIcon from '../components/RecordingIcon';

export default function VideoScreen() {
  const theme = useTheme();
  const [facing, setFacing] = useState(() => {
    try {//Use CameraType.back if available, otherwise fallback to string 'back'
      return CameraType?.back || 'back';
    } catch {
      return 'back';
    }
  });
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
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

  const handleRecordPress = () => {
    // UI only - toggle recording state for visual feedback
    setIsRecording(!isRecording);
    // TODO: Implement actual video recording functionality
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="video"
      >
        <View style={styles.overlay}> {/* Recording Button - Centered, Large (40-60% width), 95% from top */}
          <TouchableOpacity
            style={styles.recordingButton}
            onPress={handleRecordPress}
            activeOpacity={0.8}
          >
            {isRecording ? (
                <RecordingIcon size={100} color="#FF0000" />
              ) : (
                <RecordIcon size={100} color="#FF0000" />
              )}
          </TouchableOpacity>          
          {/* Flip Button - Right side (85-95% width), aligned with recording button */}
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
            activeOpacity={0.8}
          >
            <FlipIcon size={60} color="#ffffff" />
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
  recordingButton: {// Recording Button - Large, centered (40-60% of screen width), bottom edge at 95% from top
    position: 'absolute',
    left: '40%', // Start at 40% from left (40-60% = 20% width)
    width: '20%', // 40% to 60% = 20% width
    aspectRatio: 1, // Square (1:1 ratio)
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '5%',// Bottom edge at 95% from top = 5% from bottom (matching XML guideline constraint)
  },
  flipButton: {// Flip Button - Right side (85-95% of screen width), top and bottom aligned with recording button
    position: 'absolute',
    right: '5%', // 5% from right edge (85-95% = 10% width, starting at 85%)
    width: '10%', // 85-95% = 10% width
    height: Dimensions.get('window').width * 0.2,// Height matches recording button (20% of screen width since recording button is square)
    justifyContent: 'center',
    alignItems: 'center',
    // Bottom edge at same position as recording button - 5% from bottom (95% from top)
    // This ensures bottom-to-bottom alignment
    bottom: '5%',// Top will automatically align since both have same bottom and same height
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