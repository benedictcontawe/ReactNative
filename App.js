import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomSidebar from './components/CustomSideBar';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ZustandScreen from './screens/ZustandScreen';
import PagerViewScreen from './screens/PagerViewScreen';
import ChatScreen from './screens/ChatScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={ (props) => <CustomSidebar { ...props } />}
        screenOptions={{// Configuration goes here:
          drawerPosition: 'left', // Use a simple string 'left' or 'right'
        }}
        swipeEnabled={ false } 
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Zustand" component={ZustandScreen} />
        <Drawer.Screen name="PagerView" component={PagerViewScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}