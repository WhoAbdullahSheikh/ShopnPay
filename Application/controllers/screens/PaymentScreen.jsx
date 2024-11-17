import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

// You can replace these images with your own icons or images for each payment method
import SadaPayLogo from '../../assets/PaymentGateways/sadapay.png';
import NayapayLogo from '../../assets/PaymentGateways/nayapay.png';
import EasypaisaLogo from '../../assets/PaymentGateways/easypaisa.png';
import JazzCashLogo from '../../assets/PaymentGateways/jazzcash.png';

const PaymentScreen = ({ navigation }) => {
  // Set the default selected payment method to 'Pay at Counter'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Pay at Counter');

  // This function will handle the payment method selection
  const handlePaymentMethodSelection = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    console.log(`${paymentMethod} selected`);
    // You can navigate to a new screen or initiate payment functionality here
    // For example:
    // navigation.navigate('PaymentDetailScreen', { paymentMethod });
  };

  // This function will handle the proceed button press
  const handleProceed = () => {
    console.log(`Proceeding with ${selectedPaymentMethod}`);
    // You can add further logic here, such as navigation or an API call
    // For example:
    // navigation.navigate('PaymentDetailsScreen', { paymentMethod: selectedPaymentMethod });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      {/* Easypaisa Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === 'Easypaisa' && styles.selectedPaymentButton, // Apply selected style
        ]}
        onPress={() => handlePaymentMethodSelection('Easypaisa')}>
        <Image source={EasypaisaLogo} style={styles.paymentLogo} />
        {selectedPaymentMethod === 'Easypaisa' && <View style={styles.radioButtonSelected} />}
        {selectedPaymentMethod !== 'Easypaisa' && <View style={styles.radioButtonUnselected} />}
      </TouchableOpacity>

      {/* JazzCash Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === 'JazzCash' && styles.selectedPaymentButton, // Apply selected style
        ]}
        onPress={() => handlePaymentMethodSelection('JazzCash')}>
        <Image source={JazzCashLogo} style={styles.paymentLogo} />
        {selectedPaymentMethod === 'JazzCash' && <View style={styles.radioButtonSelected} />}
        {selectedPaymentMethod !== 'JazzCash' && <View style={styles.radioButtonUnselected} />}
      </TouchableOpacity>

      {/* SadaPay Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === 'SadaPay' && styles.selectedPaymentButton, // Apply selected style
        ]}
        onPress={() => handlePaymentMethodSelection('SadaPay')}>
        <Image source={SadaPayLogo} style={styles.paymentLogo} />
        {selectedPaymentMethod === 'SadaPay' && <View style={styles.radioButtonSelected} />}
        {selectedPaymentMethod !== 'SadaPay' && <View style={styles.radioButtonUnselected} />}
      </TouchableOpacity>

      {/* Nayapay Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === 'Nayapay' && styles.selectedPaymentButton, // Apply selected style
        ]}
        onPress={() => handlePaymentMethodSelection('Nayapay')}>
        <Image source={NayapayLogo} style={styles.paymentLogo} />
        {selectedPaymentMethod === 'Nayapay' && <View style={styles.radioButtonSelected} />}
        {selectedPaymentMethod !== 'Nayapay' && <View style={styles.radioButtonUnselected} />}
      </TouchableOpacity>

      {/* Pay at Counter Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === 'Pay at Counter' && styles.selectedPaymentButton, // Apply selected style
        ]}
        onPress={() => handlePaymentMethodSelection('Pay at Counter')}>
        <Text style={styles.paymentText}>Pay at Counter</Text>
        {selectedPaymentMethod === 'Pay at Counter' && <View style={styles.radioButtonSelected} />}
        {selectedPaymentMethod !== 'Pay at Counter' && <View style={styles.radioButtonUnselected} />}
      </TouchableOpacity>

      {/* Proceed Button at the Bottom */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handleProceed}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the PaymentScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  paymentButton: {
    width: '100%',
    height: 60, // Ensure all buttons are the same height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align logo and radio button to opposite ends
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3, // Added elevation for shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  selectedPaymentButton: {
    borderWidth: 1,
    borderColor: '#A52A2A', // Border color when selected
  },
  paymentLogo: {
    width: 100,  // Adjust the size of the logo for better visibility
    height: 40, // Ensuring it remains square
    resizeMode: 'contain', // This makes sure the logo scales correctly within the image container
    marginRight: 20, // Space between logo and radio button
  },
  paymentText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333', // Dark text for better visibility
  },
  radioButtonSelected: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#A52A2A', // Color for selected radio button
    borderColor: 'black', // Border color for selected radio button
    borderWidth: 1,
  },
  radioButtonUnselected: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc', // Light gray border for unselected radio button
  },
  // Style for the Proceed button
  proceedButton: {
    marginTop: 180,
    paddingVertical: 15,
    width: '90%',
    backgroundColor: '#A52A2A',
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
