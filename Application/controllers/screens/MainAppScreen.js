import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, Button, FlatList, StyleSheet, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cart from './CartScreen';
import ProfileScreen from './ProfileScreen'; // Replace with the correct path to ProfileScreen.js
import Colors from "../../src/utilities/Color"
const Tab = createBottomTabNavigator();

function HomeScreen({navigation, isDarkMode}) {
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

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? '#121212' : 'white', // Use the same dark grey
      borderRadius: 8,
      padding: 16,
      margin: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
    },
    productPrice: {
      fontSize: 16,
      color: isDarkMode ? 'lime' : 'green',
    },
    homeScreenText: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#252526' : 'transparent', // Use the same dark grey
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? '#1F1B24' : 'white'}}>
      
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

export default function MainAppScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const styles = StyleSheet.create({
    container: {
      
      flex: 1,
      backgroundColor: isDarkMode ? '#566573' : 'white', // Use the same dark grey
    },
    darkModeText: {
      color: isDarkMode ? 'white' : 'black',
    },
    darkModeContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarStyle: {
      backgroundColor: isDarkMode ? '#1F1B24' : '#E26310', // Use the same dark grey
    },
    tabBarLabel: {
      color: isDarkMode ? 'white' : 'white',
    },
    staticDarkModeText: {
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}>
          {props => <HomeScreen {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
        <Tab.Screen
          name="Cart"
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" size={size} color={color} />
            ),
          }}>
          {props => <Cart {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="user" size={size} color={color} />
            ),
          }}>
          {props => <ProfileScreen {...props} isDarkMode={isDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
      <View style={styles.darkModeContainer}>
        <Text style={styles.staticDarkModeText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
    </View>
  );
}
