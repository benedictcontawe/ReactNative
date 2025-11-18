import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImagePicker } from '../utils/imagePicker';
import { Routes } from '../constants/routes';

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 3; // 3 columns with padding

export default function ImageGalleryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Request media library permissions
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to display images.'
        );
      }
    })();

    // If an image was passed from navigation, add it to the gallery
    if (route.params?.capturedImage) {
      setImages([{ uri: route.params.capturedImage, id: Date.now() }]);
    }
  }, [route.params]);

  const pickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset, index) => ({
          uri: asset.uri,
          id: Date.now() + index,
        }));
        setImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images: ' + error.message);
    }
  };

  const pickSingleImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImages(prev => [
          ...prev,
          { uri: result.assets[0].uri, id: Date.now() },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  const removeImage = (imageId) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setImages(prev => prev.filter(img => img.id !== imageId));
          },
        },
      ]
    );
  };

  const clearAllImages = () => {
    if (images.length === 0) return;
    
    Alert.alert(
      'Clear Gallery',
      'Are you sure you want to remove all images?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setImages([]),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Image Gallery</Text>
        <TouchableOpacity onPress={clearAllImages}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.pickSingleButton]}
          onPress={pickSingleImage}
        >
          <Text style={styles.actionButtonText}>📷 Pick One</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.pickMultipleButton]}
          onPress={pickMultipleImages}
        >
          <Text style={styles.actionButtonText}>🖼️ Pick Multiple</Text>
        </TouchableOpacity>
      </View>

      {/* Image Grid */}
      {images.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No images yet</Text>
          <Text style={styles.emptySubtext}>
            Use the buttons above to add images from your gallery
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.imageGrid}>
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageWrapper}
              onPress={() => {
                navigation.navigate(Routes.IMAGE_DETAIL, { imageUri: image.uri });
              }}
              onLongPress={() => removeImage(image.id)}
            >
              <Image source={{ uri: image.uri }} style={styles.image} />
              <View style={styles.deleteOverlay}>
                <Text style={styles.deleteText}>Long press to delete</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#1a1a1a',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 140,
    alignItems: 'center',
  },
  pickSingleButton: {
    backgroundColor: '#0066cc',
  },
  pickMultipleButton: {
    backgroundColor: '#00aa44',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  imageWrapper: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 4,
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
  },
});