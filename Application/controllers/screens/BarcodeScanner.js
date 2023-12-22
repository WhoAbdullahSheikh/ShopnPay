import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const BarcodeScanner = () => {
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null);

  const handleBarcodeScan = ({ data }) => {
    setScannedBarcode(data);
    setIsCameraOpen(false);
  };

  const handleScanButtonPress = () => {
    setIsCameraOpen(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>
      <TouchableOpacity style={styles.button} onPress={handleScanButtonPress}>
        <Text style={styles.buttonText}>Scan Code</Text>
      </TouchableOpacity>

      {isCameraOpen && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={handleBarcodeScan}
        >
          <BarcodeMask />
        </RNCamera>
      )}

      {scannedBarcode && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Barcode: {scannedBarcode}</Text>
          <TouchableOpacity onPress={() => setScannedBarcode(null)}>
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  camera: {
    flex: 1,
    width: '100%',
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
});

export default BarcodeScanner;
