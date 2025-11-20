import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';
import { useTheme } from '../constants/theme';
import FlipIcon from '../components/FlipIcon';
import RecordIcon from '../components/RecordIcon';
import RecordingIcon from '../components/RecordingIcon';
import { triggerRecordingHaptic } from '../utils/hapticFeedback';

export default function VideoScreen() {
  const theme = useTheme();
  const [facing, setFacing] = useState(() => {
    try {//Use CameraType.back if available, otherwise fallback to string 'back'
      return CameraType?.back || 'back';
    } catch {
      return 'back';
    }
  });
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const recordingPromiseRef = useRef(null);

  useEffect(() => {    
    if (!cameraPermission?.granted) {// Request camera permission on mount
      requestCameraPermission();
    }
    if (!microphonePermission?.granted) {// Request microphone permission on mount
      requestMicrophonePermission();
    }
  }, []);

  if (!cameraPermission || !microphonePermission) {//Permissions are still loading
    return <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]} />;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {//Permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}>
        <Text style={[styles.message, { color: theme.colors.text }]}>We need your permission to show the camera and record audio</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.buttonPrimary }]} 
          onPress={async () => {
            await requestCameraPermission();
            await requestMicrophonePermission();
          }}
        >
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Grant Permissions</Text>
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

  const handleRecordPress = async () => {
    if (!cameraRef.current) {
      return;
    }
    triggerRecordingHaptic();
    if (isRecording) {//Stop recording
      try {
        cameraRef.current.stopRecording();
        setIsRecording(false);        
        // Wait for the recording promise to resolve and get the video data
        if (recordingPromiseRef.current) {
          try {
            const data = await recordingPromiseRef.current;
            console.log('=== VIDEO RECORDING COMPLETE ===');
            console.log('Video URI from expo-camera:', data.uri);
            console.log('Cache directory base:', FileSystem.cacheDirectory);
            // Verify file exists and get file info
            try {
              const fileInfo = await FileSystem.getInfoAsync(data.uri);
              if (fileInfo.exists) {
                console.log('✅ File EXISTS at:', data.uri);
                console.log('File size:', fileInfo.size, 'bytes (', (fileInfo.size / 1024 / 1024).toFixed(2), 'MB)');
                console.log('File is directory:', fileInfo.isDirectory);
                
                // Extract directory path from URI
                const uriPath = data.uri.replace('file://', '');
                const dirPath = uriPath.substring(0, uriPath.lastIndexOf('/'));
                console.log('File directory path:', dirPath);
                
                // Try to list the directory containing the file (need file:// scheme)
                try {
                  const dirUri = 'file://' + dirPath;
                  const files = await FileSystem.readDirectoryAsync(dirUri);
                  console.log('Files in same directory:', files);
                  console.log('Total files found:', files.length);
                } catch (dirError) {
                  console.warn('Could not list directory:', dirError.message);
                }
                
                // Also check the cache/Camera directory if it exists
                const cacheDir = FileSystem.cacheDirectory + 'Camera/';
                try {
                  const cacheDirInfo = await FileSystem.getInfoAsync(cacheDir);
                  if (cacheDirInfo.exists) {
                    const cacheFiles = await FileSystem.readDirectoryAsync(cacheDir);
                    console.log('Files in cache/Camera/ directory:', cacheFiles);
                  } else {
                    console.log('cache/Camera/ directory does not exist');
                  }
                } catch (cacheDirError) {
                  console.log('Could not access cache/Camera/ directory:', cacheDirError.message);
                }
                
                // Show Android path format
                const androidPath = data.uri.replace('file:///data/user/0/', '/data/data/');
                console.log('Android path (for Device Explorer):', androidPath);
                
                Alert.alert(
                  'Video Recorded ✅', 
                  `File saved successfully!\n\n` +
                  `Size: ${(fileInfo.size / 1024 / 1024).toFixed(2)} MB\n\n` +
                  `Path: ${androidPath}\n\n` +
                  `Note: Internal cache files are not visible in Device Explorer without root access. Check console logs for verification.`
                );
              } else {
                console.warn('❌ File does NOT exist at:', data.uri);
                Alert.alert('Video Recorded', `Video URI: ${data.uri}\n\nWarning: File not found at path`);
              }
            } catch (fileError) {
              console.error('Error checking file:', fileError);
              Alert.alert('Error', 'Failed to verify file: ' + fileError.message);
            }
          } catch (error) {
            console.error('Failed to get video data:', error);
            Alert.alert('Error', 'Failed to get video data: ' + error.message);
          }
          recordingPromiseRef.current = null;
        }
      } catch (error) {
        console.error('Failed to stop recording:', error);
        Alert.alert('Error', 'Failed to stop recording: ' + error.message);
        setIsRecording(false);
        recordingPromiseRef.current = null;
      }
    } else {//Start recording
      try {
        setIsRecording(true);
        // Start recording and store the promise (don't await yet - it resolves when recording stops)
        recordingPromiseRef.current = cameraRef.current.recordAsync();
      } catch (error) {
        console.error('Failed to start recording:', error);
        Alert.alert('Error', 'Failed to start recording: ' + error.message);
        setIsRecording(false);
        recordingPromiseRef.current = null;
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="video"
      />
      {/* Overlay positioned absolutely outside CameraView to avoid children warning */}
      <View style={styles.overlay}> 
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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