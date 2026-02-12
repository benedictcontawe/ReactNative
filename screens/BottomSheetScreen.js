import { useRef, useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from '../components/BottomSheetModalComponent';

const BottomSheetScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const handleShowSheet = () => bottomSheetModalRef.current?.present();
  const handleHideSheet = () => bottomSheetModalRef.current?.close();

  const handleInputFocus = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(3);
  }, []);

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop 
      {...props} 
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior='close'
    />
  ), []);

  return (
    <View style={styles.container}>
      <Button title="Show Bottom Sheet" onPress={handleShowSheet} />
      <Button title="Hide Bottom Sheet" onPress={handleHideSheet} />
      <BottomSheetModalComponent 
        ref={bottomSheetModalRef}
        renderBackdrop={renderBackdrop}
        handleHideSheet={handleHideSheet}
        handleInputFocus={handleInputFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0a057',
  },
});

export default BottomSheetScreen;