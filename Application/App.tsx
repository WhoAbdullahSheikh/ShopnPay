
import React from 'react';
import {Image, View, StatusBar, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Cart from './controllers/screens/CartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import ProfileScreen from './controllers/screens/ProfileScreen';
import MainAppScreen from './controllers/screens/MainAppScreen';
import BarcodeScan from './controllers/screens/BarcodeScreen';
import RegisterScreen from './controllers/screens/startups/RegisterScreen';
import LoginScreen from './controllers/screens/startups/LoginScreen';
import Credentials from './controllers/screens/startups/Credentials';
import SplashScreen from './controllers/screens/startups/SplashScreen';
import Launch from './controllers/screens/startups/LaunchScreen';
import SettingsScreen from './controllers/screens/SettingsScreen';
import AccInfo from './controllers/screens/navigations/AccInfo';
import Sidebar from './controllers/screens/Sidebar';

////////////////////////////////////////////////////////////////
//Declarations

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

////////////////////////////////////////////////////////////////
//Theming Functions
const greyTheme = {
  backgroundColor: '#A52A2A',
  textColor: 'white',
};

const ShopNPayLogo = () => (
  <Image
    source={require('./pics/mainlogo-white.png')}
    style={{
      width: 150,
      height: 60,
      resizeMode: 'contain',
    }}
  />
);


/*const HeaderWithImage = () => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 0,}}>
    <ShopNPayLogo />
  </View>
);
*/

const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: greyTheme.backgroundColor,
          
        },
        headerTintColor: greyTheme.textColor,
      }}>

      <Stack.Screen
       name="Splash" 
       component={SplashScreen} 
       options={{
        headerLeft: () => null,
       }}
      />
      <Stack.Screen
        name="Launch"
        component={Launch}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainAppScreen}
        options={{
          headerLeft: () => null,
        
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Credentials"
        component={Credentials}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="barcode"
        component={BarcodeScan}
        options={{
          
          
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="setting"
        component={SettingsScreen}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="AccountInformation"
        component={AccInfo}
        options={{
          headerLeft: () => null,
        }}
      />
     
      <Stack.Screen
        name="Sidebar"
        component={Sidebar}
        options={{
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />


        <StackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
