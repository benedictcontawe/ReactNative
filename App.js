import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  }
});

export default function App() {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification Received');
      console.log(notification)
      const userName = notification.request.content.data.userName;
      console.log(userName)
    });
    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification Response Received');
      console.log(response)
      const userName = notification.request.content.data.userName;
      console.log(userName)
    });
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: { 
        title: 'My first local notification', 
        body: 'This is the body of the notification.',
        data: { userName: 'Max' },
      },
      trigger: {
        seconds: 5
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button title='Schedule Notification' onPress={scheduleNotificationHandler}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
