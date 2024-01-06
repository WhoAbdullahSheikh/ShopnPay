import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable'; // Import the library
import Colors from '../../src/utilities/Color';

const Credentials = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  useEffect(() => {
    // Start background animations when the component mounts
    startBackgroundAnimations();
  }, []);

  const startBackgroundAnimations = () => {
    // Example background animations using react-native-animatable
    const bgContainer = this.bgContainerRef;
    const bgImage = this.bgImageRef;

    bgContainer.bounceInDown(3000); // Bounce in down animation
    bgImage.pulse(5000); // Pulse animation
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Re-password:', rePassword);
    // You can add your validation and submission logic here
  };

  return (
    <View style={styles.container}>
      {/* Background animations */}
      <Animatable.View
        ref={ref => (this.bgContainerRef = ref)}
        style={styles.backgroundContainer}>
        <Animatable.Image
          ref={ref => (this.bgImageRef = ref)}
          source={require('../../pics/shoppingstore.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animatable.View>

      {/* Input fields and Sign Up button */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={text => setName(text)}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Text style={styles.label}>Re-password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          onChangeText={text => setRePassword(text)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  inputContainer: {
    backgroundColor: 'rgba(165, 42, 42, 0.85)', // Semi-transparent red with 50% opacity
    borderRadius: 20,
    padding: 16,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  label: {
    fontSize: 18,
    marginBottom: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: '80%',
    color: 'white',
  },
  button: {
    backgroundColor: '#A52A2A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Credentials;
