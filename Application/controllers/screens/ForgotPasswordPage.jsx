import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPasswordPage = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    const phoneNumber = `${countryCode}${contact}`;
    // Here you would usually initiate a password reset process via Firebase or your backend
    try {
      // Assume you use Firebase for password reset with email
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <View style={styles.countryCodeBox}>
          <Text style={styles.countryCodeText}>+92</Text>
        </View>
        <TextInput
          value={contact}
          onChangeText={setContact}
          placeholder="Enter number"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'Raleway-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  countryCodeBox: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    height: 45,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '60%',
    marginBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 10,
    fontSize: 15,
  },
  button: {
    width: 300,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#A52A2A',
    shadowColor: 'black',
    shadowOffset: {
      width: 6,
      height: 2,
    },
    shadowOpacity: 0.6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ForgotPasswordPage;
