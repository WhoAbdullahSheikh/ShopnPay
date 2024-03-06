import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../components/config';

const Credentials = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  useEffect(() => {
    startBackgroundAnimations();
  }, []);

  const startBackgroundAnimations = () => {
    const bgContainer = this.bgContainerRef;
    const bgImage = this.bgImageRef;

    bgContainer.bounceInDown(3000);
    bgImage.pulse(3000);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !rePassword) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
        rePassword: rePassword,
      };
  
      const documentRef = doc(db, 'customers', 'details');
      await updateDoc(documentRef, {
        RegisteredUser: arrayUnion(userData),
      });
  
      setName('');
      setEmail('');
      setPassword('');
      setRePassword('');
      
      alert('Sign up successful!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View
        ref={ref => (this.bgContainerRef = ref)}
        style={styles.backgroundContainer}>
        <Animatable.Image
          ref={ref => (this.bgImageRef = ref)}
          source={require('../../../pics/shoppingstore.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animatable.View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, styles.enterDetails]}>PERSONAL INFORMATION</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#888"
          onChangeText={text => setName(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Text style={styles.label}>Re-password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#888"
          onChangeText={text => setRePassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 75,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android to show elevation
  },
  enterDetails: {
    textAlign: 'center',
    fontSize: 26,
    paddingBottom: 40,
    fontFamily: 'Raleway-Bold',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.8,
    paddingBottom: 50,
  },
  inputContainer: {
    backgroundColor: 'rgba(165, 42, 42, 0.95)',
    borderRadius: 20,
    padding: 16,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    borderColor: 'black',
    borderWidth: 3,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: '80%',
    color: 'black',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 6,
      height: 2,
    },
    shadowOpacity: 0.6,
  },
  button: {
    backgroundColor: '#A52A2A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Credentials;
