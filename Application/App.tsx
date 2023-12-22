import * as React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeScan from './controllers/screens/BarcodeScanner'
import MainAppScreen from './controllers/screens/MainAppScreen';
import RegisterScreen from './controllers/screens/RegisterScreen';
import LoginScreen from './controllers/screens/LoginScreen';
import OtpScreen from './controllers/otp/OtpScreen';

const Stack = createStackNavigator();

const greyTheme = {
  backgroundColor: '#E26310', // Greyish black for the background
  textColor: 'white',
};

const ShopNPayLogo = () => (
  <Image
    source={require('./pics/mainlogo-white.png')} // Update the path to your image
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
      <Stack.Navigator
        initialRouteName="barcode"
        screenOptions={{
          headerStyle: {
            backgroundColor: greyTheme.backgroundColor,
          },
          headerTintColor: greyTheme.textColor,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: () => <HeaderWithImage />,
          headerLeft: () => null,
         }}
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
          name="barcode"
          component={BarcodeScan}
          options={{ headerTitle: () => <HeaderWithImage />,
          headerLeft: () => null,
         }}
        />
        <Stack.Screen
          name="otp"
          component={OtpScreen}
          options={{ headerTitle: () => <HeaderWithImage />,
          headerLeft: () => null,
         }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
