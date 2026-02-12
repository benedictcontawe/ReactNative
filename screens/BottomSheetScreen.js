import { useRef, useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from '../components/BottomSheetModalComponent';
import BottomSheetScrollViewComponent from '../components/BottomSheetScrollViewComponent';

const BottomSheetScreen = () => {
  // 1. Separate Refs for each modal
  const bottomSheetModalRef = useRef(null);
  const bottomSheetScrollModalRef = useRef(null);//BottomSheetScrollViewComponent
  // 2. Handlers for the standard modal
  const handleShowSheet = () => bottomSheetModalRef.current?.present();
  const handleHideSheet = () => bottomSheetModalRef.current?.close();
  // 3. Handlers for the scroll view modal
  const handleShowScrollSheet = () => bottomSheetScrollModalRef.current?.present();
  // 4. Focus handler (updated to accept a specific ref)
  const handleFocus = useCallback((ref) => {
    ref.current?.snapToIndex(3);
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
      <View style={styles.buttonGap}>
        <Button title="Show Standard Sheet" onPress={handleShowSheet} />
        <Button title="Show Scroll View Sheet" onPress={handleShowScrollSheet} />
        <Button title="Hide All" onPress={() => {
            bottomSheetModalRef.current?.close();
            bottomSheetScrollModalRef.current?.close();
        }} color="red" />
      </View>
      {/* MODAL 1: Standard View */}
      <BottomSheetModalComponent
        ref={bottomSheetModalRef}
        renderBackdrop={renderBackdrop}
        handleHideSheet={handleHideSheet}
        handleInputFocus={() => handleFocus(bottomSheetModalRef)}
      />
      {/* MODAL 2: Scroll View */}
      <BottomSheetScrollViewComponent 
        ref={bottomSheetScrollModalRef}
        renderBackdrop={renderBackdrop}
        handleInputFocus={() => handleFocus(bottomSheetScrollModalRef)}
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
  buttonGap: {
    gap: 10,
  }
});

export default BottomSheetScreen;