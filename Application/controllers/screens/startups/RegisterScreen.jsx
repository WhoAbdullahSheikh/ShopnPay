import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../../components/config';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RegisterPage = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [verificationText, setVerificationText] = useState('');
  const [incorrectCode, setIncorrectCode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const resendOTP = () => {
    setCode('');
  };

  function onAuthStateChanged(user) {
    if (user) {
      // Handle user state change
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
      setShowPasswordFields(numericInput.length === 10);
    }
  };

  const checkUserExists = async (phoneNumber) => {
    const detailsRef = doc(db, 'customers', 'details');
    const docSnapshot = await getDoc(detailsRef);

    if (!docSnapshot.exists()) {
      console.log('No details document found.');
      return false;
    }

    const users = docSnapshot.data().RegisteredUser;
    const userFound = users.find(user => user.phoneNumber === phoneNumber);

    return !!userFound;
  };

  async function signInWithPhoneNumber() {
    const phoneNumber = `${countryCode}${contact}`;
    if (!contact.trim() || !password.trim() || !confirmPassword.trim() || !name.trim()) {
      Alert.alert('Register Failed', 'Please Enter all required fields.');
      return;
    }

    if (contact.trim().length < 10) {
      Alert.alert('Invalid phone number', 'Please enter a valid phone number');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }

    const userExists = await checkUserExists(phoneNumber);
    if (userExists) {
      Alert.alert('Registration Error', 'This phone number is already registered.');
      return;
    } 

    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert('Failed to send OTP', 'There was a problem sending the verification code.');
    }
  }

  async function confirmCode() {
    try {
      let response = await confirm.confirm(code);
      if (response) {
        console.log('OTP verification successful.');

        const fullPhoneNumber = `${countryCode}${contact}`;
        const userData = {
          name: name,
          phoneNumber: fullPhoneNumber,
          password: password,
        };

        try {
          await updateDoc(doc(db, 'customers', 'details'), {
            RegisteredUser: arrayUnion(userData),
          });

          console.log('User data added to Firestore');
          setContact('');
          setName('');
          setPassword('');
          setConfirmPassword('');
        } catch (error) {
          Alert.alert('Error', 'Error saving user data');
        }

        navigation.navigate('Verification');
      }
    } catch (error) {
      console.log('Invalid OTP code.');
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
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor="#888"
                style={[
                  styles.pass_input,
                  focusedInput === 'name' ? styles.focusedInput : null,
                ]}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#888"
                  style={[
                    styles.pass_input,
                    focusedInput === 'password' ? styles.focusedInput : null,
                  ]}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="black" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#888"
                  style={[
                    styles.pass_input,
                    focusedInput === 'confirmPassword' ? styles.focusedInput : null,
                  ]}
                  onFocus={() => setFocusedInput('confirmPassword')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="black" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={signInWithPhoneNumber}>
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
  otpcontainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '78%',
  },
  resendotp: {
    fontFamily: 'Raleway-Regular',
    color: '#A52A2A',
    fontWeight: 'bold',
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
    borderRadius: 15,
    borderColor: 'black',
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#A52A2A',
    width: 240,
    marginBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  pass_input: {
    borderColor: '#A52A2A',
    width: 300,
    marginBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginBottom: 10,
  },
  icon: {
    marginLeft: -30,
    bottom: 5,
  },
  focusedInput: {
    borderColor: '#A52A2A',
    borderWidth: 2,
    backgroundColor: '#fff',
    shadowColor: '#A52A2A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 15,
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
