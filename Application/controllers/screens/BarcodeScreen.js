import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const BarcodeScanner = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

  const handleBarcodeScan = ({ data }) => {
    setScannedBarcode(data);
    setIsConfirmationModalVisible(true);
  };

  const handleScanButtonPress = () => {
    setIsCameraOpen(true);
    // Ensure the flashlight is off when starting a new scan
    if (cameraRef.current && isFlashOn) {
      setIsFlashOn(false);
    }
  };

  const handleToggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const handleAddToCart = () => {
    // Implement logic to add the product to the cart
    navigation.navigate('Cart', { scannedBarcode });
    setIsConfirmationModalVisible(false);
    setScannedBarcode(null);
  };

  const handleCancelScan = () => {
    setIsConfirmationModalVisible(false);
    setScannedBarcode(null);
  };
  
  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const [isComponentMounted, setIsComponentMounted] = useState(true);

  useEffect(() => {
    return () => {
      if (isComponentMounted) {
        if (cameraRef.current) {
          cameraRef.current.release();
        }
      }
    };
  }, [isComponentMounted]);

  useEffect(() => {
    return () => {
      setIsComponentMounted(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.Scanbutton} onPress={handleScanButtonPress}>
          <Text style={styles.buttonText}>Scan Code</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
      <TouchableOpacity style={styles.flashButton} onPress={handleToggleFlash}>
        <Text style={styles.buttonText}>
          {isFlashOn ? 'Turn Off Flash' : 'Turn On Flash'}
        </Text>
      </TouchableOpacity>

      {isCameraOpen && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={handleBarcodeScan}
          captureAudio={true}
          flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          autoFocus={RNCamera.Constants.AutoFocus.on} // Enable autoFocus
          autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }} // Center of the view
          iosCameraParams={{
            focusDepth: 0.05, // Experiment with different values
          }}
        >
          <BarcodeMask />
        </RNCamera>
      )}

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>* Place the product a little far from the camera *</Text>
      </View>

      {isConfirmationModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isConfirmationModalVisible}
          onRequestClose={() => setIsConfirmationModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.resultText}>Scanned Barcode: {scannedBarcode}</Text>
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
      <TouchableOpacity style={styles.closeButton} onPress={handleCloseCamera}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
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
    alignItems: 'center', // Center the items vertically
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backIcon: {
    paddingTop: 10,
  },
  Scanbutton: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
    marginLeft: 120,

  },
  flashButton: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  camera: {
    width: '95%', 
    aspectRatio: 16/11, 
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
    color: 'white',
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
    padding: 15,
    borderRadius: 10,
  },
});

export default BarcodeScanner;
