import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  Image,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Cart from './CartScreen';
import ProfileScreen from './ProfileScreen'; // Replace with the correct path to ProfileScreen.js
import BarcodeScanner from './BarcodeScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';
import PromotionsScreen from './PromotionsScreen';

const Tab = createBottomTabNavigator();
// HEADER
const greyTheme = {
  backgroundColor: '#A52A2A',
  textColor: 'white',
};

const HeaderWithImage = () => {
  return (
    <View>
      <ShopNPayLogo />
    </View>
  );
};

const ShopNPayLogo = () => (
  <Image
    source={require('./../../pics/mainlogo-white.png')}
    style={{
      width: 150,
      height: 60,
      resizeMode: 'contain',
      marginBottom: 10,
    }}
  />
);

export default function MainAppScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabel,
          headerStyle: {
            backgroundColor: greyTheme.backgroundColor,
          },
          headerTintColor: greyTheme.textColor,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <HeaderWithImage />,
            tabBarIcon: () => <Icon name="home" size={25} color="white" />,
          }}
        />

        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: () => (
              <Icon name="shopping-cart" size={25} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Scanning"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: '#d04949',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 0,
                  borderColor: 'white',
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 7,
                }}>
                <Icon name="barcode" color="white" size={25} />
              </View>
            ),
          }}
          component={BarcodeScanner}
        />
        <Tab.Screen
          name="Promotions"
          component={PromotionsScreen}
          options={{
            tabBarIcon: () => <Icon name="bullhorn" size={25} color="white" />,
          }}
        />
        <Tab.Screen
          name="My Account"
          component={ProfileScreen}
          options={{
            headerShown: false,

            tabBarIcon: () => <Icon name="user" size={25} color="white" />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A52A2A',
  },
  tabBarStyle: {
    backgroundColor: '#A52A2A',
  },
  tabBarLabel: {
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
});
