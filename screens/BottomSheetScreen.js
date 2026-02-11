import React, { useState, useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

const BottomSheetScreen = () => {
  const [bottomSheetTextInputValue, setBottomSheetTextInputValue] = useState('');
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [`25%`, `50%`, `70%`], []);//const snapPoints = useMemo(() => [`45%`], []);
  const handleShowSheet = () => bottomSheetModalRef.current?.present();
  const handleHideSheet = () => bottomSheetModalRef.current?.close();
  const renderBackdrop = (props) => (
  <BottomSheetBackdrop 
    {...props} 
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior='close'
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
  />
);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BottomSheet Screen</Text>
      <Button title="Show Bottom Sheet" onPress={handleShowSheet} />
      <Button title="Hide Bottom Sheet" onPress={handleHideSheet} />
        <BottomSheetModal 
            ref={bottomSheetModalRef} 
            index={0}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: 'black' }}
            backgroundStyle={{ backgroundColor: '#CCC' }}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
            enableContentPanningGesture={true}
            enableHandlePanningGesture={true}        
            android_keyboardInputMode="adjustResize"
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
        >
        <BottomSheetView style={styles.contentContainer}>
            <Text>This is Bottomsheet</Text>
            <Text style={{ fontSize: 16 }}>Sheet is Open!</Text>
            <Button 
                    title="Tap to Close" 
                    onPress={handleHideSheet}
                />
            <BottomSheetTextInput
              style={styles.input} // Needs styling to be visible
              placeholder="Bottom Sheet Text Input"
              placeholderTextColor="#666"
              keyboardType="default"
              value={bottomSheetTextInputValue}
              onChangeText={setBottomSheetTextInputValue}
            />

            <Button title="Submit" onPress={() => console.log(bottomSheetTextInputValue)} />
        </BottomSheetView>
      </BottomSheetModal>
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
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Light background to see it on gray
    width: '100%',
    color: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});

export default BottomSheetScreen;