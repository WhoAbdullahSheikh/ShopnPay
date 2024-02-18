import * as React from 'react';
import { Image, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeScan from './controllers/screens/BarcodeScreen';
import MainAppScreen from './controllers/screens/MainAppScreen';
import RegisterScreen from './controllers/screens/RegisterScreen';
import LoginScreen from './controllers/screens/LoginScreen';
//import PhoneSignIn from './controllers/screens/PhoneSignIn';
import Credentials from './controllers/screens/Credentials';
import SplashScreen from './controllers/screens/SplashScreen';
import Launch from './controllers/screens/LaunchScreen';
import CartScreen from './controllers/screens/CartScreen';
import ProfileScree from './controllers/screens/ProfileScreen';

const Stack = createStackNavigator();

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

const HeaderWithImage = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <ShopNPayLogo />
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: greyTheme.backgroundColor,
          },
          headerTintColor: greyTheme.textColor,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{
            headerTitle: () => <HeaderWithImage />,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: () => <HeaderWithImage />, headerLeft: () => null}}
        />
         <Stack.Screen
          name="Profile"
          component={LoginScreen}
          options={{ headerTitle: () => <HeaderWithImage />, headerLeft: () => null }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainAppScreen}
          options={{
            headerTitle: () => <HeaderWithImage />,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: () => <HeaderWithImage />,
            headerLeft: () => null,
            
          }}
        />
        <Stack.Screen
          name="Credentials"
          component={Credentials}
          options={{
            headerTitle: () => <HeaderWithImage />,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="barcode"
          component={BarcodeScan}
          options={{
            headerTitle: () => <HeaderWithImage />,
            headerLeft: () => null,
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
