import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ImagePicker, isAvailable } from '../utils/imagePicker';
import { Routes } from '../constants/routes';
import OptionBottomSheetModal from '../components/OptionBottomSheetModal';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {  
    if (route.params?.capturedImage) {//Check if an image was passed from navigation (from Camera or Gallery)
      setDisplayImage(route.params.capturedImage);
      navigation.setParams({ capturedImage: undefined });//Clear the params to avoid showing the same image on next visit
    }
  }, [route.params]);

  const handleImagePress = () => setBottomSheetVisible(true);

  const handleClose = () => setBottomSheetVisible(false);

  const handleTakePhoto = () => {
    handleClose();
    navigation.navigate(Routes.CAMERA);
  };

  const handleRecordVideo = () => {
    handleClose();
    navigation.navigate(Routes.VIDEO);
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
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();//Request permissions
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to select images.'
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });//Launch image picker
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
    navigation.navigate(Routes.IMAGE_GALLERY, { capturedImage: displayImage });
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
      <StatusBar style="auto" />
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
              source={require('../assets/icon.png')}
              style={styles.centerImage}
              resizeMode="contain"
            />
            <Text style={styles.placeholderText}>Tap to open camera options</Text>
          </Pressable>
        )}
      </View>
      <OptionBottomSheetModal
        visible={bottomSheetVisible}
        onClose={handleClose}
        onTakePhoto={handleTakePhoto}
        onRecordVideo={handleRecordVideo}
        onChoosePhoto={handleChoosePhoto}
        onViewGallery={handleViewGallery}
      />
    </SafeAreaView>
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
});