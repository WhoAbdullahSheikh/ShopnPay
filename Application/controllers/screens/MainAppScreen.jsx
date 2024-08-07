import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image, Text, View, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cart from './CartScreen';
import ProfileScreen from './ProfileScreen'; // Replace with the correct path to ProfileScreen.js
import BarcodeScanner from './BarcodeScreen';
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
      <AppLogo />
    </View>
  );
};

const AppLogo = () => (
  <Image
    source={require('../../pics/mainlogo-white.png')}
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
