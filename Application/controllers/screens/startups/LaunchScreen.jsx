import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming React Navigation usage
import Register from './RegisterScreen';
const Launch = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      navigation.navigate('Register'); // Replace 'Home' with your desired screen
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../../pics/shopping.gif')} style={styles.logo} />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Launch;
