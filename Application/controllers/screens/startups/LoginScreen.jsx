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
  getDoc,
} from 'firebase/firestore';
import { db } from '../../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [password, setPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleContactChange = (inputText) => {
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
      await AsyncStorage.setItem('userSession', JSON.stringify({ phoneNumber }));

      Alert.alert('Login Successful', 'You are logged in successfully');
      navigation.navigate('MainScreen');
    } else {
      Alert.alert('Login Failed', 'Invalid phone number or password.');
      setPassword('');
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem('userSession');
      if (session) {
        navigation.navigate('MainScreen');
        setContact('');
        setPassword('');
      }
    };

    checkSession();
  }, []);

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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 10, // Increased border radius for a softer look
    borderColor: 'black',
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0,
    borderColor: 'black',
    width: '60%',
    marginBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 10,
    fontSize: 15,
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
    borderColor: 'black',
    width: 300,
    marginBottom: 10,
    padding: 10,
    height: 45,
    borderRadius: 10,
    fontSize: 15,
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
  registerText: {
    fontFamily: 'Raleway-Regular',
    color: '#A52A2A',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: -15,
  },
});

export default LoginScreen;
