import React, { useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const BottomSheetScreen = () => {
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
            enableHandlePanningGesture={true} >
            <BottomSheetView style={styles.contentContainer}>
                <Text>This is Bottomsheet</Text>
                <Text style={{ fontSize: 16 }}>Sheet is Open!</Text>
                <Button 
                    title="Tap to Close" 
                    onPress={handleHideSheet}
                />
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0055a4',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});

export default BottomSheetScreen;