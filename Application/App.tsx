import React from 'react';
import {
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import Cart from './controllers/screens/CartScreen';
import ProfileScreen from './controllers/screens/ProfileScreen';
import MainAppScreen from './controllers/screens/MainAppScreen';
import BarcodeScannerScreen from './controllers/screens/BarcodeScreen';
import RegisterScreen from './controllers/screens/startups/RegisterScreen';
import LoginScreen from './controllers/screens/startups/LoginScreen';
import Credentials from './controllers/screens/startups/Credentials';
import SplashScreen from './controllers/screens/startups/SplashScreen';
import Launch from './controllers/screens/startups/LaunchScreen';
import AccInfo from './controllers/screens/navigations/AccInfo';
import Sidebar from './controllers/screens/Sidebar';
import VerificationScreen from './controllers/screens/VerificationScreen';
import NotificationSettings from './controllers/screens/navigations/NotificationSettings';
import ChangePasswordScreen from './controllers/screens/ChangepasswordScreen';
import QRCodeScreen from './controllers/screens/QRCodeScreen';
import Purchasehistory from './controllers/screens/PurchaseHistory';
import ForgotPasswordPage from './controllers/screens/ForgotPasswordPage';

const Stack = createStackNavigator();

const greyTheme = {
  backgroundColor: '#A52A2A',
  textColor: 'white',
};

const AppLogo = () => (
  <Image
    source={require('./pics/mainlogo-white.png')}
    style={{
      width: 150,
      height: 60,
      resizeMode: 'contain',
      marginBottom: 10,
    }}
  />
);

const HeaderWithImage = () => {
  return (
    <View>
      <AppLogo />
    </View>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
        component={BarcodeScannerScreen}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="AccountInformation"
        component={AccInfo}
        options={{
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => <HeaderWithImage />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={25}
                color={greyTheme.textColor}
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{
          headerLeft: () => null,
        }}
      />
       <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPage}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => <HeaderWithImage />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={25}
                color={greyTheme.textColor}
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="purchaseHistory"
        component={Purchasehistory}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => <HeaderWithImage />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={25}
                color={greyTheme.textColor}
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="qrcode"
        component={QRCodeScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => <HeaderWithImage />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={25}
                color={greyTheme.textColor}
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <StackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
