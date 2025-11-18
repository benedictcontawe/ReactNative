import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../constants/theme';

export default function OptionBottomSheetModal({
  visible,
  onClose,
  onTakePhoto,
  onRecordVideo,
  onChoosePhoto,
  onViewGallery,
}) {
  const theme = useTheme();

  // Dynamic styles based on the theme
  const bottomSheetStyle = {
    ...styles.bottomSheet,
    backgroundColor: theme.colors.surface,
  };

  const titleStyle = {
    ...styles.bottomSheetTitle,
    color: theme.colors.text,
  };

  const buttonStyle = {
    ...styles.bottomSheetButton,
    backgroundColor: theme.colors.surfaceSecondary,
  };

  const buttonTextStyle = {
    ...styles.buttonText,
    color: theme.colors.buttonPrimary,
  };

  const separatorStyle = {
    ...styles.separator,
    backgroundColor: theme.colors.border,
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={bottomSheetStyle}>
          <Text style={titleStyle}>Camera Expo</Text>

          <TouchableOpacity style={buttonStyle} onPress={onTakePhoto}>
            <Text style={buttonTextStyle}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyle}
            onPress={onRecordVideo}
          >
            <Text style={buttonTextStyle}>Record Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyle}
            onPress={onChoosePhoto}
          >
            <Text style={buttonTextStyle}>Choose Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyle}
            onPress={onViewGallery}
          >
            <Text style={buttonTextStyle}>View Gallery</Text>
          </TouchableOpacity>

          <View style={separatorStyle} />

          <TouchableOpacity style={buttonStyle} onPress={onClose}>
            <Text style={[styles.cancelButtonText, { color: theme.colors.buttonDanger }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomSheetButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  cancelButtonText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: '500',
  },
});