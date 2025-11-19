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
import { useTheme } from '../constants/theme';

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 3; //3 columns with padding
/**
 * Normalizes a URI by removing query parameters and fragments for consistent comparison.
 * @param {string} uri - The URI to normalize
 * @returns {string} The normalized URI without query parameters and fragments, or empty string if uri is falsy
 * @description Helper function to normalize URI for comparison. Removes query parameters and fragments.
 */
const normalizeUri = (uri) => {
  if (!uri) return '';
  return uri.split('?')[0].split('#')[0].trim();
};
/**
 * Creates a unique key from image metadata for duplicate detection.
 * @param {Object} asset - The image asset object from ImagePicker
 * @param {string} [asset.fileName] - The file name of the image
 * @param {number} [asset.fileSize] - The file size of the image in bytes
 * @returns {string} A unique key in the format "fileName_fileSize"
 * @description Helper function to create a unique key from image metadata. Uses fileName + fileSize as unique identifier since URIs change each time the image picker creates temporary cache files.
 */
const getImageKey = (asset) => {
  const fileName = asset?.fileName || '';
  const fileSize = asset?.fileSize || 0;
  return `${fileName}_${fileSize}`;
};
/**
 * Checks if an image already exists in the gallery using unified duplicate detection.
 * Handles both camera images (URI-based) and picked images (imageKey-based).
 * @param {Array<Object>} existingImages - Array of existing image objects in the gallery
 * @param {Object} newImage - The new image object to check
 * @param {string} newImage.uri - The URI of the new image
 * @param {string|null} [newImageKey=null] - The imageKey (fileName_fileSize) of the new image, if available
 * @param {string|null} [newImageUri=null] - The URI of the new image (alternative to newImage.uri)
 * @returns {boolean} True if the image is a duplicate, false otherwise
 * @description Unified function to check if an image already exists in the gallery. 
 * First checks by imageKey (for picked images with fileName + fileSize), 
 * then falls back to normalized URI comparison (for camera images or when imageKey is not available).
 */
const isImageDuplicate = (existingImages, newImage, newImageKey = null, newImageUri = null) => {
  const normalizedNewUri = normalizeUri(newImageUri || newImage.uri);
  return existingImages.some(img => { // Check by imageKey (for picked images with fileName + fileSize)
    if (newImageKey && img.imageKey && newImageKey === img.imageKey) {
      return true;
    }    
    const normalizedExistingUri = normalizeUri(img.uri);// Check by normalized URI (for camera images or when imageKey is not available)
    if (normalizedExistingUri === normalizedNewUri) {
      return true;
    }    
    return false;
  });
};

export default function ImageGalleryScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);

  useEffect(() => {
    ( async () => { 
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();//Request media library permissions
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to display images.'
        );
      }
    }) ();

    if (route.params?.capturedImage) {// If an image was passed from navigation, add it to the gallery
      setImages(prevImages => { // Use a function to ensure we don't add duplicates if the user navigates back and forth
        const capturedImage = route.params.capturedImage;
        const capturedImageKey = route.params.capturedImageKey || null; // Get imageKey if provided
        const imageExists = isImageDuplicate(prevImages, { uri: capturedImage }, capturedImageKey, capturedImage);
        return imageExists ? prevImages : [{ 
          uri: capturedImage, 
          id: Date.now(),
          imageKey: capturedImageKey, // Store imageKey if available
          fileName: route.params.capturedFileName || null,
          fileSize: route.params.capturedFileSize || null,
        }, ...prevImages];
      });
    }
  }, [route.params]);

  const pickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });
      console.log('=== PICK MULTIPLE IMAGES DEBUG ===');
      console.log('Full result:', JSON.stringify(result, null, 2));
      if (!result.canceled && result.assets) {
        setImages(prev => {
          console.log('Current gallery images count:', prev.length);
          console.log('Current gallery image keys:', prev.map(img => img.imageKey || 'no-key'));          
          // Create a Set of existing image keys for comparison (for previously picked images)
          const existingKeys = new Set(prev.map(img => img.imageKey).filter(Boolean));
          console.log('Existing image keys:', Array.from(existingKeys));          
          // Also create a Set of normalized URIs for camera images (images without imageKey)
          const existingCameraUris = new Set(
            prev
              .filter(img => !img.imageKey) // Only camera images (no imageKey)
              .map(img => normalizeUri(img.uri))
          );
          console.log('Existing camera image URIs (normalized):', Array.from(existingCameraUris));          
          // Filter out duplicates: both from existing gallery and within the new selection
          const seenKeys = new Set(existingKeys);
          const seenUris = new Set(existingCameraUris);
          const newImages = [];          
          console.log('Selected assets count:', result.assets.length);
          for (const asset of result.assets) {
            const imageKey = getImageKey(asset);
            const normalizedAssetUri = normalizeUri(asset.uri);
            console.log('Asset fileName:', asset.fileName);
            console.log('Asset fileSize:', asset.fileSize);
            console.log('Asset imageKey:', imageKey);
            console.log('Asset URI (normalized):', normalizedAssetUri);            
            // Check if duplicate: against existing gallery OR within current selection
            const isDuplicateInGallery = isImageDuplicate(prev, asset, imageKey, asset.uri);
            const isDuplicateInSelection = seenKeys.has(imageKey) || seenUris.has(normalizedAssetUri);
            const isDuplicate = isDuplicateInGallery || isDuplicateInSelection;
            console.log('Is duplicate in gallery?', isDuplicateInGallery);
            console.log('Is duplicate in selection?', isDuplicateInSelection);
            console.log('Is duplicate?', isDuplicate);            
            if (!isDuplicate) {
              seenKeys.add(imageKey);
              seenUris.add(normalizedAssetUri);
              newImages.push({
                uri: asset.uri,
                id: Date.now() + newImages.length,
                imageKey: imageKey,
                fileName: asset.fileName,
                fileSize: asset.fileSize,
              });
              console.log('✓ Added to newImages');
            } else {
              console.log('✗ Skipped (duplicate)');
            }
          }          
          console.log('New images to add:', newImages.length);
          console.log('Final gallery size will be:', prev.length + newImages.length);
          console.log('=== END PICK MULTIPLE DEBUG ===\n');          
          return newImages.length > 0 ? [...prev, ...newImages] : prev;
        });
      } else {
        console.log('User canceled or no assets');
      }
    } catch (error) {
      console.error('Error picking multiple images:', error);
      Alert.alert('Error', 'Failed to pick images: ' + error.message);
    }
  };

  const pickSingleImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8,
      });
      console.log('=== PICK SINGLE IMAGE DEBUG ===');
      console.log('Full result:', JSON.stringify(result, null, 2));

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const imageUri = asset.uri;
        const imageKey = getImageKey(asset);        
        console.log('Selected image URI:', imageUri);
        console.log('Selected image fileName:', asset.fileName);
        console.log('Selected image fileSize:', asset.fileSize);
        console.log('Selected imageKey:', imageKey);        
        setImages(prev => {
          console.log('Current gallery images count:', prev.length);
          console.log('Current gallery image keys:', prev.map(img => img.imageKey || 'no-key'));
          console.log('Current gallery URIs:', prev.map(img => img.uri));          
          const normalizedAssetUri = normalizeUri(imageUri);
          console.log('Selected image URI (normalized):', normalizedAssetUri);          
          // Check if image already exists using unified duplicate detection
          const imageExists = isImageDuplicate(prev, asset, imageKey, imageUri);
          console.log('Image already exists?', imageExists);
          if (imageExists) {
            console.log('✗ Skipped (duplicate)');
            console.log('=== END PICK SINGLE DEBUG ===\n');
            return prev;
          }          
          console.log('✓ Adding new image');
          console.log('Final gallery size will be:', prev.length + 1);
          console.log('=== END PICK SINGLE DEBUG ===\n');
          return [{ 
            uri: imageUri, 
            id: Date.now(),
            imageKey: imageKey,
            fileName: asset.fileName,
            fileSize: asset.fileSize,
          }, ...prev];
        });
      } else {
        console.log('User canceled or no asset');
      }
    } catch (error) {
      console.error('Error picking single image:', error);
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
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.headerBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.colors.headerText }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.headerText }]}>Image Gallery</Text>
        <TouchableOpacity onPress={clearAllImages}>
          <Text style={[styles.clearButton, { color: theme.colors.buttonDanger }]}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={[styles.actionButtons, { backgroundColor: theme.colors.backgroundTertiary }]}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.buttonPrimary }]}
          onPress={pickSingleImage}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.buttonText }]}>📷 Pick One</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.buttonSuccess }]}
          onPress={pickMultipleImages}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.buttonText }]}>🖼️ Pick Multiple</Text>
        </TouchableOpacity>
      </View>

      {/* Image Grid */}
      {images.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>No images yet</Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
            Use the buttons above to add images from your gallery
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.imageGrid}>
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={[styles.imageWrapper, { backgroundColor: theme.colors.backgroundTertiary }]}
              onPress={() => {
                navigation.navigate(Routes.IMAGE_DETAIL, { imageUri: image.uri });
              }}
              onLongPress={() => removeImage(image.id)}
            >
              <Image source={{ uri: image.uri }} style={styles.image} />
              <View style={[styles.deleteOverlay, { backgroundColor: theme.colors.overlayDark }]}>
                <Text style={[styles.deleteText, { color: theme.colors.textInverse }]}>Long press to delete</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 140,
    alignItems: 'center',
  },
  actionButtonText: {
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  emptySubtext: {
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
    padding: 4,
  },
  deleteText: {
    fontSize: 10,
    textAlign: 'center',
  },
});