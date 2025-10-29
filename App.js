import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ModalScreen from './screens/ModalScreen';
import BottomSheetScreen from './screens/BottomSheetScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

  const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            initialRouteName="Home" >
            <BottomTab.Screen name="Home" component={HomeScreen} />
            <BottomTab.Screen name='Modal' component={ModalScreen} />
            <BottomTab.Screen name="BottomSheet" component={BottomSheetScreen} />
            <BottomTab.Screen name="Settings" component={SettingsScreen} />
          </BottomTab.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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