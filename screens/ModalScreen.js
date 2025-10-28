import React, { useState } from 'react';
import { Button, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';

const ModalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleShowModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modal Screen</Text>
      <Button title="Show Modal" onPress={handleShowModal} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} 
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <BlurView
                style={styles.absoluteBlur}
                blurType="light"
                blurAmount={Platform.OS === 'ios' ? 10 : 8}
                reducedTransparencyFallbackColor="white"
            />
            <TouchableOpacity 
                style={styles.closeButton} 
                onPress={handleCloseModal}
            >
                <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <View style={styles.modalContentWrapper}> 
                <Text style={styles.modalTitle}>Title Modal</Text>
                <Text style={styles.modalBody}>Body Content</Text>
                <TouchableOpacity style={styles.modalPositiveButton} onPress={()=>{}}>
                    <Text style={styles.positiveButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalNegativeButton} onPress={handleCloseModal}>
                    <Text style={styles.negativeButtonText}>No</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0055a4',
  },
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
    borderRadius: ,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
  },
  modalNegativeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D4AF37',        
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
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

export default ModalScreen;