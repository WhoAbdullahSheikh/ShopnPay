import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDocs,
  query,
  collection,
  where,
} from 'firebase/firestore';

import {db} from '../../components/config';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

const LoginPage = ({navigation}) => {
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationText, setVerificationText] = useState('');
  const [incorrectCode, setIncorrectCode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleContactChange = inputText => {
    const numericInput = inputText.replace(/[^0-9]/g, '');
    if (/^\d{0,10}$/.test(numericInput)) {
      setContact(numericInput);
      setShowPasswordFields(numericInput.length === 10);
    }
  };

  const checkUserExists = async (phoneNumber, password) => {
    const detailsRef = doc(db, 'customers', 'details');
    const docSnapshot = await getDoc(detailsRef);
  
    if (!docSnapshot.exists()) {
      console.log("No details document found.");
      return false;
    }
  
    const users = docSnapshot.data().RegisteredUser;
    const userFound = users.find(user => user.phoneNumber === phoneNumber && user.password === password);
  
    return !!userFound;
  };
  

  const handleLogin = async () => {
    const phoneNumber = `${countryCode}${contact}`;
    console.log("Attempting to login with phone number:", phoneNumber);
  
    const userExists = await checkUserExists(phoneNumber, password);
    if (userExists) {
      Alert.alert('Login Successful', 'You are logged in successfully');
      navigation.navigate('MainScreen');
    } else {
      Alert.alert('Login Failed', 'Invalid phone number or password.');
     
      setPassword('');
    }
  };
  

  if (!confirm) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.selectContainer}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.countryCodeText}>+92</Text>
            </View>
            <TextInput
              value={contact}
              onChangeText={handleContactChange}
              placeholder="Enter number"
              placeholderTextColor="#888"
              style={[
                styles.input,
                focusedInput === 'contact' ? styles.focusedInput : null,
              ]}
              keyboardType="phone-pad"
              maxLength={10}
              onFocus={() => setFocusedInput('contact')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          {showPasswordFields && (
            <>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry={true}
                placeholderTextColor="#888"
                style={[
                  styles.pass_input,
                  focusedInput === 'password' ? styles.focusedInput : null,
                ]}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.link}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}> Register</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    );
  }
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
  ////////////////////////////////
  otpcontainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '78%',
  },
  resendotp: {
    fontFamily: 'Raleway-Regular',
    color: '#A52A2A',
    fontWeight: 'bold',

    //marginTop: 20,
  },

  otpmessagejson: {
    flexGrow: 1,
    width: 250,
    marginLeft: 20,
    marginTop: 60,
  },
  verifyheading: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    marginBottom: 10,
  },

  verifytext: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    marginLeft: 38,
    marginRight: 38,
    paddingBottom: 20,
  },

  otpinput: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    marginBottom: 0,
    paddingBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 10,
    fontSize: 18,
  },
  incorrectCodeMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  ////////////////////////////////
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
  pass_input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    marginBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 10,
    fontSize: 15,
  },
  focusedInput: {
    borderColor: '#A52A2A', // A deep red color for the border
    borderWidth: 2,
    backgroundColor: '#fff', // Optional: can adjust the background color for contrast
    shadowColor: '#A52A2A', // Use the same color as the border for the glow effect
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6, // Adjust opacity for more or less glow
    shadowRadius: 10, // Spread of the glow
    elevation: 15, // Android shadow
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
    marginTop: 17,
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    marginBottom: 7,
  },
  loginText: {
    fontFamily: 'Raleway-Regular',
    color: '#A52A2A',
    fontWeight: 'bold',
  },
  registerText: {
    fontFamily: 'Raleway-Regular',
    color: '#A52A2A',
    fontWeight: 'bold',
  },
});

export default LoginPage;
