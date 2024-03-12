import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Colors from "../../src/utilities/Color"
import Receipt from './Receipt';

const Cart = ({ route }) => {
  const { scannedBarcode } = route.params || { scannedBarcode: null };

  // Initialize state to store the cumulative list of scanned products
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleAddToCart = () => {
    // Create a new cart item with the scanned product details
    const newCartItem = {
      productName: scannedBarcode,
      price: 10, // Set the appropriate price
      quantity: 1, // Initialize quantity to 1
    };

    // Update the cart and totalBill
    setCart([...cart, newCartItem]);
    setTotalBill(totalBill + newCartItem.price);
  };

  const handleGenerateReceipt = () => {
    // Open the receipt modal
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    // Close the receipt modal
    setShowReceipt(false);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
    setTotalBill(totalBill + updatedCart[index].price);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
      setTotalBill(totalBill - updatedCart[index].price);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <View style={styles.productInfo}>
              <TouchableOpacity onPress={() => handleDecreaseQuantity(index)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.productName}>{item.productName}</Text>
              <TouchableOpacity onPress={() => handleIncreaseQuantity(index)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${item.price * item.quantity}</Text>
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
      <TouchableOpacity style={styles.generateReceiptButton} onPress={handleGenerateReceipt}>
        <Text style={styles.buttonText}>Generate Receipt</Text>
      </TouchableOpacity>

      {/* Receipt Modal */}
      <Modal
        visible={showReceipt}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseReceipt}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.receiptContainer}>
            <Receipt cart={cart} totalBill={totalBill} />
          </ScrollView>
          <TouchableOpacity onPress={handleCloseReceipt} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  productName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  quantityButton: {
    fontSize: 20,
    color: 'green',
    marginHorizontal: 8,
  },
  price: {
    fontSize: 16,
    color: 'green',
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
  generateReceiptButton: {
    backgroundColor: '#A52A2A',
    padding: 12,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  totalBill: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    backgroundColor: 'transparent',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Cart;
