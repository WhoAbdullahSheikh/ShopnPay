import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../../src/Color";
import Receipt from './Receipt';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // Import LottieView

const Cart = ({ route }) => {
  const { scannedProduct } = route.params || {};
  const navigation = useNavigation();

  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from AsyncStorage on component mount
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (scannedProduct && !isProductInCart(scannedProduct)) {
      addProductToCart(scannedProduct);
    }
  }, [scannedProduct]);

  useEffect(() => {
    // Save cart to AsyncStorage whenever it changes
    saveCartToStorage();
  }, [cart]);

  const loadCartFromStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem('@cart');
      if (cartData !== null) {
        setCart(JSON.parse(cartData));
        setTotalBill(calculateTotalBill(JSON.parse(cartData)));
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  };

  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  const isProductInCart = (product) => {
    return cart.some(item => item.productName === product.description);
  };

  const addProductToCart = (product) => {
    const newCartItem = {
      productName: product.description,
      price: product.price,
      quantity: 1,
    };
    const updatedCart = [...cart, newCartItem];
    setCart(updatedCart);
    setTotalBill(calculateTotalBill(updatedCart));
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
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    setTotalBill(calculateTotalBill(updatedCart));
  };

  const calculateTotalBill = (cart) => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleConfirmReceipt = async () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Please add some items to the cart before confirming.');
      return;
    }

    const qrData = {
      cart,
      totalBill,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    // Save to purchase history
    try {
      const purchaseHistoryData = await AsyncStorage.getItem('@purchaseHistory');
      let purchaseHistory = [];
      if (purchaseHistoryData !== null) {
        purchaseHistory = JSON.parse(purchaseHistoryData);
      }
      purchaseHistory.push(qrData);
      await AsyncStorage.setItem('@purchaseHistory', JSON.stringify(purchaseHistory));
    } catch (error) {
      console.error('Error saving purchase history to AsyncStorage:', error);
    }

    // Clear cart
    setCart([]);
    setTotalBill(0);

    // Navigate to QR code screen
    navigation.navigate('qrcode', { qrData });
    handleCloseReceipt(); // Close the modal
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
      <Text style={styles.heading}>Cart</Text>
      <View style={styles.tableHeader_bottom}></View>

      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>

          <LottieView
            style={styles.animationjson}
            source={require('../../pics/animations/notfound.json')}
            autoPlay
            loop={true}
          />

        </View>
      ) : (
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
      )}
      <Text style={styles.totalBill}><Text style={styles.boldText}>Total Bill: </Text>Rs. {totalBill}/-</Text>
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
            <Receipt cart={cart} totalBill={totalBill} />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCloseReceipt} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmReceipt} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
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
  heading: {
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 10,
    color: 'black',
    fontFamily: 'Raleway-Regular',
    fontWeight: 'bold',
  },
  tableHeader_bottom: {
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: '#000',
    marginBottom: 10,
    paddingBottom: 5,
    width: '92%',
    marginLeft: 15,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationjson: {
    width: 250,
    height: 250,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
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
  generateReceiptButton: {
    backgroundColor: '#A52A2A',
    padding: 12,
    borderRadius: 20,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
  totalBill: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    backgroundColor: 'transparent',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
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
  closeButton: {
    backgroundColor: '#A52A2A',
    padding: 12,
    borderColor: 'white',
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    width: '30%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#A52A2A',
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    width: '30%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
  },
});

export default Cart;
