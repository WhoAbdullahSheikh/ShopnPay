import * as React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeScan from './controllers/screens/BarcodeScreen';
import MainAppScreen from './controllers/screens/MainAppScreen';
import RegisterScreen from './controllers/screens/RegisterScreen';
import LoginScreen from './controllers/screens/LoginScreen';
import OtpScreen from './controllers/otp/OtpScreen';
import Credentials from './controllers/screens/Credentials';
import Launch from './controllers/screens/LaunchScreen';
import CartScreen from './controllers/screens/CartScreen'; // Import CartScreen
//import { CartProvider } from './controllers/screens/CartContext'; // Update with the correct path

const Stack = createStackNavigator();

const greyTheme = {
  backgroundColor: '#A52A2A', // Greyish black for the background
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
        initialRouteName="MainScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: greyTheme.backgroundColor,
          },
          headerTintColor: greyTheme.textColor,
        }}>
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{ headerTitle: () => <HeaderWithImage />,
          headerLeft: () => null,
         }}

       
        />
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
