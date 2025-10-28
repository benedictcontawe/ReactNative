import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Title Modal</Text>
            <Text style={styles.modalBody}>
              Body Content
            </Text>
            <TouchableOpacity style={styles.modalPositiveButton} onPress={()=>{}}>
                <Text style={styles.positiveButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalNegativeButton} onPress={handleCloseModal}>
                <Text style={styles.negativeButtonText}>No</Text>
            </TouchableOpacity>
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
    backgroundColor: '#f0f4f8',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0055a4',
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 15,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
    width: '85%',
    padding: 30,
    paddingRight: 40,
  },
  closeButton: {
    position: 'absolute', 
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 0, 
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
    color: '#111111', 
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    color: '#444444', 
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