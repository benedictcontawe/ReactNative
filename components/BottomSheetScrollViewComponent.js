import React, { useState, useMemo, forwardRef } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { 
  BottomSheetModal, 
  BottomSheetScrollView, 
  BottomSheetTextInput 
} from '@gorhom/bottom-sheet';

// Static sample data for experimenting
const SAMPLE_COMMENTS = [
  { id: '1', user: 'Alex', text: 'This is a great sample!' },
  { id: '2', user: 'Sam', text: 'I love how smooth the scrolling is.' },
  { id: '3', user: 'Jordan', text: 'React Native Bottom Sheet is powerful.' },
  { id: '4', user: 'Taylor', text: 'Testing long lists for scrolling...' },
  { id: '5', user: 'Morgan', text: 'Another comment to fill the space.' },
  { id: '6', user: 'Casey', text: 'Is this scrollable yet? Yes it is!' },
  { id: '7', user: 'Riley', text: 'Adding more data for the experiment.' },
  { id: '8', user: 'Jamie', text: 'Final sample comment here.' },
];

const BottomSheetScrollViewComponent = forwardRef((props, ref) => {
  const { renderBackdrop, handleInputFocus } = props;
  const [text, setText] = useState('');
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <BottomSheetModal
      ref={ref}
      index={1} // Opens at 50% by default
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      {/* 1. Scrollable Area */}
      <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Comments ({SAMPLE_COMMENTS.length})</Text>
        
        {SAMPLE_COMMENTS.map((item) => (
          <View key={item.id} style={styles.commentItem}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </BottomSheetScrollView>

      {/* 2. Fixed Input Area at the bottom of the Modal */}
      <View style={styles.inputWrapper}>
        <BottomSheetTextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={text}
          onChangeText={setText}
          onFocus={handleInputFocus}
        />
        <Button title="Post" onPress={() => console.log('Posted:', text)} />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra space so content isn't hidden by the input
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#999',
    marginRight: 12,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: '#444',
  },
  inputWrapper: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
});

export default BottomSheetScrollViewComponent;