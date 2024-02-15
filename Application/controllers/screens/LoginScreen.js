import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from "../../src/utilities/Color"
const LoginPage = ({ navigation }) => {
 const [contact, setContact] = useState('');
 const [password, setPassword] = useState('');

 const handleLogin = () => {
    // Add your login logic here
    
    setContact('');
    setPassword('');
    navigation.navigate('MainScreen');
 };

 return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Contact"
        placeholderTextColor="#888"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
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
 title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: "Raleway-Regular",
 },
 input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
 },
 button: {

    width: '80%',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#A52A2A",
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
    fontWeight: 'bold',
 },
 link: {
    marginTop: 20,
    color: 'black',
 },
});

export default LoginPage;
