import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Colors from "../../src/utilities/Color"

const Cart = ({ route, isDarkMode }) => {
  const { cart, totalBill } = route.params || { cart: [], totalBill };

  const styles = StyleSheet.create({
    cartHeader: {
      textAlign: 'center',
      fontSize: 24,
      marginVertical: 10,
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#252526' : 'transparent',
     
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#252526' : 'white',
    },
    productName: {
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
      fontWeight: 'bold',
     
    },
    price: {
      fontSize: 16,
      color: isDarkMode ? 'lime' : 'green',
     
    },
    totalBill: {
      textAlign: 'center',
      fontSize: 20,
      marginVertical: 10,
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#252526' : 'transparent',
     
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#252526' : 'white' }}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
      <Text style={styles.totalBill}>Total Bill: ${totalBill}</Text>
    </View>
  );
};

export default Cart;
