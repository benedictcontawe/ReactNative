import { StyleSheet, Text, TouchableOpacity, View, Modal, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

const ModalComponent = ({
  isVisible,
  onClose,
  title,
  body,
  onConfirm,
  confirmText = 'Yes',
  cancelText = 'No',
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <BlurView
            style={styles.absoluteBlur}
            blurType="light"
            blurAmount={Platform.OS === 'ios' ? 10 : 8}
            reducedTransparencyFallbackColor="white"
          />
          
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose} // Use the prop 'onClose'
          >
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          
          {/* Content Wrapper */}
          <View style={styles.modalContentWrapper}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalBody}>{body}</Text>
            
            {/* Positive Button */}
            <TouchableOpacity style={styles.modalPositiveButton} onPress={onConfirm}>
              <Text style={styles.positiveButtonText}>{confirmText}</Text>
            </TouchableOpacity>
            
            {/* Negative Button */}
            <TouchableOpacity style={styles.modalNegativeButton} onPress={onClose}>
              <Text style={styles.negativeButtonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absoluteBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
  },
  modalContentWrapper: {
    padding: 30,
    paddingRight: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'transparent',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    width: '85%',
  },
  closeButton: {
    position: 'absolute', 
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B3B3B3',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFF', 
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    color: '#BCBCBC', 
  },
  modalPositiveButton: {
    alignSelf: 'center',
    backgroundColor: '#D4AF37', 
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '80%',
  },
  modalNegativeButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D4AF37',        
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: '80%',
  },
  positiveButtonText: {
    color: 'white', 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  negativeButtonText: {
        color: '#D4AF37',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ModalComponent;