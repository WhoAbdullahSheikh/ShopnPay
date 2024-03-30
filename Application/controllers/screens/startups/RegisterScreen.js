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
import {doc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../components/config';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';


const RegisterPage = ({navigation}) => {
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationText, setVerificationText] = useState('');
  const [incorrectCode, setIncorrectCode] = useState(false);

  const resendOTP = () => {
    setCode('');
  };

  function onAuthStateChanged(user) {
    if (user) {
    }
  }

  useEffect(() => {
    const phoneNumberWithAsterisks = `${countryCode}******${contact.slice(-4)}`;
    setVerificationText(
      `We are automatically detecting a SMS sent to your mobile number ${phoneNumberWithAsterisks}`,
    );
  }, [contact]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleContactChange = inputText => {
    const numericInput = inputText.replace(/[^0-9]/g, '');
    if (/^\d{0,10}$/.test(numericInput)) {
      setContact(numericInput);
    }
  };

  async function signInWithPhoneNumber() {
    const phoneNumber = countryCode + contact;
    if (!contact.trim()) {
      Alert.alert('Please enter a phone number.');
      return;
    }

    if (contact.trim().length < 10) {
      Alert.alert('Invalid phone number', 'Please enter a valid phone number');
      return;
    }

    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);

    const userData = {
      phoneNumber: phoneNumber,
    };

    try {
      const documentRef = doc(db, 'customers', 'details');
      await updateDoc(doc(db, 'customers', 'details'), {
        RegisteredUser: arrayUnion(userData),
      });
      console.log('User data added to Firestore');
      console.log('Register success');
      setContact('');
    } catch (error) {
      console.error('Error adding user data:', error);
    }
  }
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log('Correct.');
      navigation.navigate('Verification');
    } catch (error) {
      console.log('Invalid code.');
      setIncorrectCode(true);
    }
  }

  if (!confirm) {
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => signInWithPhoneNumber()}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.link}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}> Log In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.otpcontainer}>
      <LottieView
        style={styles.otpmessagejson}
        source={require('../../../pics/animations/otpmessage.json')}
        autoPlay
        loop={true}
      />

      <Text style={styles.verifyheading}>Enter Verification Code</Text>
      <Text style={styles.verifytext}>{verificationText}</Text>
      <TextInput
        value={code}
        onChangeText={text => {
          if (text.length <= 6) {
            setCode(text);
          }
        }}
        placeholder="Enter verification code"
        placeholderTextColor="#888"
        style={styles.otpinput}
        keyboardType="numeric"
        maxLength={6}
      />
      {incorrectCode && (
        <Text style={styles.incorrectCodeMessage}>
          Incorrect code. Please try again.
        </Text>
      )}

      <Text style={styles.link}>
        Don't receive the OTP?
        <TouchableOpacity onPress={resendOTP}>
          <Text style={styles.resendotp}> RESEND OTP</Text>
        </TouchableOpacity>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!code.trim()) {
            Alert.alert(
              'Verification Code Required',
              'Please enter the verification code.',
            );
          } else {
            confirmCode(code);
          }
        }}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
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
});

export default RegisterPage;
