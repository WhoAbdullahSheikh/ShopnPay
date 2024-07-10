import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/config';
import Cart from './CartScreen';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
const Tab = createBottomTabNavigator();

const BarcodeScannerScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsFlashOn(false);
      setIsCameraOpen(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarcodeScan = async ({ data }) => {
    if (scannedBarcode) {
      return; // Prevent further scanning if a barcode has already been scanned
    }

    try {
      console.log(`Scanning barcode: ${data}`);
      setScannedBarcode(data); // Set scannedBarcode immediately

      const querySnapshot = await getDocs(collection(db, 'outlets'));
      let foundProduct = null;

      querySnapshot.forEach((doc) => {
        const martItems = doc.data().items || [];
        console.log(`Checking items in document ${doc.id}:`, martItems);
        const item = martItems.find((item) => item.barcode === data);
        if (item) {
          foundProduct = item;
        }
      });

      if (foundProduct) {
        console.log(`Product found:`, foundProduct);
        setIsConfirmationModalVisible(true);
      } else {
        Alert.alert('Attention', 'Product not found');
        setScannedBarcode(null); // Reset scannedBarcode if product not found
        setIsCameraOpen(false); // Close the camera after product not found
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      Alert.alert('Error fetching items. Please try again.');
      setScannedBarcode(null); // Reset scannedBarcode in case of an error
      setIsCameraOpen(false); // Close the camera after error
    }
  };

  const handleScanButtonPress = () => {
    setIsCameraOpen(true);
    if (cameraRef.current && isFlashOn) {
      setIsFlashOn(false);
    }
  };

  const handleToggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const handleAddToCart = () => {
    navigation.navigate('Cart', { scannedBarcode });
    setIsConfirmationModalVisible(false);
    setScannedBarcode(null);
    setIsCameraOpen(false);
  };

  const handleCancelScan = () => {
    setIsConfirmationModalVisible(false);
    setScannedBarcode(null);
    setIsCameraOpen(false); // Close the camera when scan is canceled
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanButtonPress}>
          <Text style={styles.buttonText}>Scan Code</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.flashButton} onPress={handleToggleFlash}>
        <Text style={styles.buttonText}>
          <Icon name={isFlashOn ? 'flash' : 'flash-off'} size={24} color="#A52A2A" />
        </Text>
      </TouchableOpacity>

      {isCameraOpen && !isConfirmationModalVisible && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={handleBarcodeScan}
          captureAudio={false}
          flashMode={
            isFlashOn
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          autoFocus={RNCamera.Constants.AutoFocus.on}>
          <BarcodeMask width={250} height={250} />
        </RNCamera>
      )}

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>
          * Place the product a little far from the camera *
        </Text>
      </View>

      {isConfirmationModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isConfirmationModalVisible}
          onRequestClose={() => setIsConfirmationModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.resultText}>
                Scanned Barcode: {scannedBarcode}
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelScan}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {isCameraOpen && (
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseCamera}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scanButton: {
    backgroundColor: '#A52A2A',
    padding: 10,
    borderRadius: 10,
    marginLeft: 100,
    paddingLeft: 40,
    paddingRight: 40,
  },
  flashButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  camera: {
    width: '95%',
    aspectRatio: 24 / 19,
    borderRadius: 20,
    overflow: 'hidden',
  },
  instructionsContainer: {
    marginBottom: 20,
    paddingTop: 10,
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#A52A2A',
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    marginLeft: 100,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

const BarcodeScanner = () => {
  const navigation = useNavigation();
  const greyTheme = {
    backgroundColor: '#A52A2A',
    textColor: 'white',
  };

  return (
    <View style={styles2.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles2.tabBarStyle,
          tabBarLabelStyle: styles2.tabBarLabel,
          tabBarActiveTintColor: greyTheme.textColor,
          tabBarInactiveTintColor: 'lightgrey',
          headerStyle: {
            backgroundColor: greyTheme.backgroundColor,
          },
          headerTintColor: greyTheme.textColor,
          headerLeft: () => (
            route.name === 'Scan' && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon2 name="chevron-left" size={25} color={greyTheme.textColor} style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            )
          ),
        })}>
        <Tab.Screen
          name="Scan"
          component={BarcodeScannerScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="barcode" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="cart" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A52A2A',
  },
  tabBarStyle: {
    backgroundColor: '#A52A2A',
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Raleway-Bold',
  },
});

export default BarcodeScanner;
