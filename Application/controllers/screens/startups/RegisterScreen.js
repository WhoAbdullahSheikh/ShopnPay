import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {doc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../components/config';

const RegisterPage = ({navigation}) => {
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+92');

  const handleContactChange = inputText => {
    const numericInput = inputText.replace(/[^0-9]/g, '');
    if (/^\d{0,10}$/.test(numericInput)) {
      setContact(numericInput);
    }
  };

  const registerUser = async () => {
    const phoneNumber = countryCode + contact;
    if (!contact.trim()) {
      Alert.alert('Please enter a phone number.');
      return;
    }

    // Add user data to Firestore
    const userData = {
      phoneNumber: phoneNumber,
    };

    try {
      const documentRef = doc(db, 'customers', 'details');
      await updateDoc(documentRef, {
        RegisteredUser: arrayUnion(userData),
      });
      console.log('User data added to Firestore');
      console.log('Register success');
      setContact('');

      // Navigate to the Credentials screen only if the user has successfully registered the phone number
      navigation.navigate('Credentials', {phoneNumber: phoneNumber});
    } catch (error) {
      console.error('Error adding user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Get Started</Text>
        <View style={styles.selectContainer}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCodeText}>+92</Text>
          </View>
          <TextInput
            value={contact}
            onChangeText={handleContactChange}
            placeholder="Enter number"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            Already have an account?{' '}
            <Text style={styles.loginText}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 230,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.7,
  },
  title: {
    fontSize: 35,
    marginBottom: 40,
    color: 'black',
    fontFamily: 'Raleway-Bold',
   
  },
  selectContainer: {
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
  link: {
    color: 'black',
    marginTop: 20,
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
  loginText: {
    fontFamily: 'Raleway-Regular',
    color: '#A52A2A',
    fontWeight: 'bold',
    
  },
});

export default RegisterPage;
