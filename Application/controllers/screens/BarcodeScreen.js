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
  // Cleanup function to stop and release camera resources when the component is unmounted
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
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.Scanbutton} onPress={handleScanButtonPress}>
          <Text style={styles.buttonText}>Scan Code</Text>
        </TouchableOpacity>

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
          setFlash={isFlashOn}
        >
          <BarcodeMask />
        </RNCamera>
      )}

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>* Place the product a little far from camera *</Text>
      </View>

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
    alignItems: 'center',
    paddingTop: 20,
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 70,
    marginBottom: 10,
    paddingLeft: 140,
  },
  Scanbutton: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
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
    width: '90%', 
    aspectRatio: 4/4, 
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
});

export default BarcodeScanner;