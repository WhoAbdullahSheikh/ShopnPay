import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import Colors from "../../src/utilities/Color"

const Cart = ({ route }) => {
  const { scannedBarcode } = route.params || { scannedBarcode: null };

  // Initialize state to store the cumulative list of scanned products
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const styles = StyleSheet.create({
    cartHeader: {
      textAlign: 'center',
      fontSize: 24,
      marginVertical: 10,
      color:  'black',
      backgroundColor:  'transparent',
     
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    productInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    productImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    productName: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      color: 'green',
    },
    totalBill: {
      textAlign: 'center',
      fontSize: 20,
      marginVertical: 10,
      color: 'black',
      backgroundColor: 'transparent',
    },
    scannedBarcodeContainer: {
      backgroundColor: '#A52A2A',
      padding: 10,
      marginVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    scannedBarcodeText: {
      color: 'white',
      fontSize: 16,
    },
  });

  const handleAddToCart = () => {
    // Create a new cart item with the scanned product details
    const newCartItem = {
      productName: scannedBarcode,
      price: 10, // Set the appropriate price
      //productImage: '', // Set the appropriate image URI
    };

    // Update the cart and totalBill
    setCart([...cart, newCartItem]);
    setTotalBill(totalBill + newCartItem.price);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.productInfo}>
              {/* Display your product image here */}
              <Text style={styles.productName}>{item.productName}</Text>
            </View>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
      {scannedBarcode && (
        <View style={styles.scannedBarcodeContainer}>
          <Text style={styles.scannedBarcodeText}>Scanned Barcode: {scannedBarcode}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.totalBill}>Total Bill: ${totalBill}</Text>
    </View>
  );
};

export default Cart;