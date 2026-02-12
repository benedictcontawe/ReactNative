import { useState, useMemo, forwardRef } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

const BottomSheetModalComponent = forwardRef((props, ref) => {
    const { renderBackdrop, handleHideSheet, handleInputFocus } = props;
    const [bottomSheetTextInputValue, setBottomSheetTextInputValue] = useState('');
    const snapPoints = useMemo(() => [`30%`, `50%`, `70%`], []);

    return (
        <BottomSheetModal 
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: 'black' }}
            backgroundStyle={{ backgroundColor: '#CCC' }}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
            android_keyboardInputMode="adjustResize"
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.title}>This is Bottomsheet</Text>                
                <BottomSheetTextInput
                    style={styles.input}
                    placeholder="Type something..."
                    placeholderTextColor="#666"
                    value={bottomSheetTextInputValue}
                    onChangeText={setBottomSheetTextInputValue}
                    onFocus={handleInputFocus} 
                />
                <Button title="Submit" onPress={() => console.log(bottomSheetTextInputValue)} />
                <Button title="Tap to Close" onPress={handleHideSheet} color="red" />
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default BottomSheetModalComponent;