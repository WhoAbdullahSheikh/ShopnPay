import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';


const BarcodeScanner = () => {
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isFlashOn, setIsFlashOn] = useState(false);

  const handleBarcodeScan = ({ data }) => {
    setScannedBarcode(data);
    setIsCameraOpen(false);
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

  const [isComponentMounted, setIsComponentMounted] = useState(true);
  // Cleanup function to stop and release camera resources when component is unmounted
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
      <Text style={styles.title}>Barcode Scanner</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleScanButtonPress}>
          <Text style={styles.buttonText}>Scan Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.flashButton} onPress={handleToggleFlash}>
          <Text style={styles.buttonText}>
            {isFlashOn ? 'Turn Off Flash' : 'Turn On Flash'}
          </Text>
        </TouchableOpacity>
      </View>

      {isCameraOpen && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={handleBarcodeScan}
          captureAudio={true}
          flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          // Use setFlash prop to toggle the flashlight
          setFlash={isFlashOn}
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
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  flashButton: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
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
