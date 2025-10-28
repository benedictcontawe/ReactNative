import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ModalComponent from '../components/ModalComponent';

const ModalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleConfirmAction = () => {
    console.log('Action Confirmed!');
    handleCloseModal(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modal Screen</Text>
      <Button title="Show Modal" onPress={handleShowModal} />
      <ModalComponent
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title="Title Modal"
        body="Body Content that asks the user a question."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0a057',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0055a4',
  },
});

export default ModalScreen;