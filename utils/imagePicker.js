// Safe wrapper for expo-image-picker that handles missing native module
let ImagePicker = null;
let isAvailable = false;

// Try to require the module, but handle errors gracefully
try {
  const imagePickerModule = require('expo-image-picker');
  // Check if the module actually loaded (not just the JS wrapper)
  if (imagePickerModule && typeof imagePickerModule.requestMediaLibraryPermissionsAsync === 'function') {
    ImagePicker = imagePickerModule;
    isAvailable = true;
  } else {
    throw new Error('Module loaded but functions not available');
  }
} catch (error) {
  console.warn('expo-image-picker native module not available:', error.message);
  // Create a mock object to prevent crashes
  ImagePicker = {
    requestMediaLibraryPermissionsAsync: async () => ({ status: 'unavailable' }),
    launchImageLibraryAsync: async () => ({ canceled: true }),
    MediaTypeOptions: { Images: 'images' },
  };
  isAvailable = false;
}

export { ImagePicker, isAvailable };
export default ImagePicker;

