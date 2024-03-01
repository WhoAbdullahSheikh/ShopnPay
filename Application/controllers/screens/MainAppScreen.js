import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Button, FlatList, StyleSheet, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Cart from './CartScreen';
import ProfileScreen from './ProfileScreen'; // Replace with the correct path to ProfileScreen.js
import BarcodeScanner from './BarcodeScreen';
import DashboardScreen from './navigations/Sidebar';
import SettingsScreen from './SettingsScreen';

////////////////////////////////////////////////////////////////
const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  const addToCart = (productName, price) => {
    setCart([...cart, {productName, price}]);
    setTotalBill(totalBill + price);
  };

  const products = [
    {name: 'Product 1', price: 10},
    {name: 'Product 2', price: 20},
    {name: 'Product 3', price: 30},
    {name: 'Product 4', price: 40},
  ];

  ////////////////////////////////////////////////////////////////
  const styles = StyleSheet.create({
    card: {
      borderRadius: 8,
      padding: 16,
      margin: 8,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    productPrice: {
      fontSize: 16,
      color: 'green',
    },
    homeScreenText: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(item.name, item.price)}
            />
          </View>
        )}
      />
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart', {cart, totalBill})}
      />
    </View>
  );
}

////////////////////////////////////////////////////////////////
export default function MainAppScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="home" size={25} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={BarcodeScanner}
          options={{
            tabBarIcon: () => (
              <Icon name="barcode" size={25} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          options={{
            tabBarLabel:'',
            tabBarIcon: ({color}) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 10, // space from bottombar
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  backgroundColor: '#d04949',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 0,
                  borderColor: 'white',
                  shadowColor: 'black', // Glow color
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
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: () => (
              <Icon name="shopping-cart" size={25} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="My Account"
          component={ProfileScreen}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarIcon: () => (
              <Icon name="user" size={25} color="white" />
            ),
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
    backgroundColor: '#A52A2A', //Theme main color
  },
  tabBarLabel: {
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
 
});
