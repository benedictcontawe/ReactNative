import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_MESSAGES = [
  { id: '1', text: 'Hey! How are you doing?', sender: 'receiver', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', text: 'I\'m doing great! Thanks for asking 😊', sender: 'sender', timestamp: new Date(Date.now() - 3500000).toISOString() },
  { id: '3', text: 'That\'s awesome! What have you been up to lately?', sender: 'receiver', timestamp: new Date(Date.now() - 3400000).toISOString() },
  { id: '4', text: 'Just working on some projects. Really enjoying it!', sender: 'sender', timestamp: new Date(Date.now() - 3300000).toISOString() },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const handleSend = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'sender',
      timestamp: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    // Scroll to bottom after state update
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  // --- KEYBOARD LISTENERS ---
  useEffect(() => {
    // Determine which event to listen for based on OS
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    
    const showSubscription = Keyboard.addListener(showEvent, () => {
      // Move the list up so the latest message isn't hidden by the keyboard
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      showSubscription.remove();
    };
  }, []);

  const renderMessage = ({ item }) => {
    const isSender = item.sender === 'sender';
    return (
      <View style={[styles.messageContainer, isSender ? styles.senderContainer : styles.receiverContainer]}>
        <View style={[styles.messageBubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
          <Text style={[styles.messageText, isSender ? styles.senderText : styles.receiverText]}>{item.text}</Text>
          <Text style={[styles.timestamp, isSender ? styles.senderTimestamp : styles.receiverTimestamp]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        // 'padding' is generally more reliable for chat inputs than 'height'
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        // Offset helps if the keyboard still covers the input. 
        // 90 is a good starting point for Android if using a header.
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
             <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              // This is a pro-move: it scrolls to the end whenever the height of the list changes
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message..."
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={handleSend}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '75%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  senderBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  receiverBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  senderText: {
    color: '#FFFFFF',
  },
  receiverText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 2,
  },
  senderTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  receiverTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingStart: 12,
    paddingEnd: 12,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
    color: '#000',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatScreen;