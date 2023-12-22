import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import {phoneNumber} from '../screens/RegisterScreen';
const OtpScreen = () => {
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [code, setCode] = useState('');
  const[confirmation, setConfirmation] = useState('');

  const request = async () => {
    setDisplayOTPInput(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  const signIn =  async ()=> {
    try {
      await confirm.confirm(code);
      console.log('Signed in successfully');
    } catch (error) {
      console.log('Invalid code.');
    }
    
  }

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleButtonPress = () => {
   
    console.log('Button pressed:', inputs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        {inputs.map((input, index) => (
          <TextInput 
            key={index}
            style={styles.input}
            value={code}
            onChangeText={(setCode) => handleChange(index, value)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    margin: 5,
    height: 40,
    textAlign: 'center',
    borderRadius: 10,
    
  },
  button: {
    backgroundColor: 'black',
    width: 100,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default OtpScreen;
