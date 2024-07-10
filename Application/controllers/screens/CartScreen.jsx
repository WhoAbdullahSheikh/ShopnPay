import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../../src/Color";
import Receipt from './Receipt'; // Assuming Receipt component is in the same directory
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../components/config';

const Cart = ({ route }) => {
  const { scannedBarcode } = route.params || { scannedBarcode: null };

  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0); // Initialize totalBill as 0
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scannedBarcode) {
      fetchProductPrice(scannedBarcode);
    }
  }, [scannedBarcode]);

  const fetchProductPrice = async (barcode) => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'outlets'),
        query(collection(db, 'outlets'), where('items.barcode', '==', barcode)));

      querySnapshot.forEach((doc) => {
        const martItems = doc.data().items || [];
        const item = martItems.find((item) => item.barcode === barcode);
        if (item) {
          const newCartItem = {
            productName: item.description,
            price: item.price,
            quantity: 1,
          };
          setCart([...cart, newCartItem]);
          setTotalBill(totalBill + item.price); // Update totalBill correctly
        }
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Handle error fetching product details
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReceipt = () => {
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
    setTotalBill(calculateTotalBill(updatedCart));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
      setTotalBill(calculateTotalBill(updatedCart));
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    setTotalBill(totalBill - (updatedCart[index].price * updatedCart[index].quantity));
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotalBill = (cart) => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A52A2A" />
        <Text style={styles.loadingText}>Fetching Product Details...</Text>
      </View>
    );
  }

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
            <View style={styles.priceAndDelete}>
              <Text style={styles.price}>Rs. {item.price * item.quantity}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {scannedBarcode && (
        <View style={styles.scannedBarcodeContainer}>
          <Text style={styles.scannedBarcodeText}>Scanned Barcode: {scannedBarcode}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={fetchProductPrice}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.totalBill}>Total Bill: Rs. {totalBill}</Text>
      <TouchableOpacity style={styles.generateReceiptButton} onPress={handleGenerateReceipt}>
        <Text style={styles.buttonText}>Generate Receipt</Text>
      </TouchableOpacity>

      <Modal
        visible={showReceipt}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseReceipt}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.receiptContainer}>
            <Receipt cart={cart} totalBill={totalBill} calculateTotalBill={calculateTotalBill} />
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={handleCloseReceipt} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
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
  priceAndDelete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  deleteButton: {
    fontSize: 20,
    color: 'red',
    marginLeft: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    maxHeight: '80%',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#A52A2A',
    padding: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
