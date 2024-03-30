import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VerificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../pics/animations/verified-3.json')}
        autoPlay
        loop
      />
      <Text style={styles.verifyheading}>Successfully</Text>
      <Text style={styles.message}>Your Account has been Created!</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('MainScreen')}>
        <Text style={styles.optionText} >Let's Get Started</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Raleway-Regular',
    marginBottom: 20,
    alignContent: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    marginTop: 250,
    borderColor: '#A52A2A',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#A52A2A',
  },
  optionText: {
    marginLeft: 100,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
  verifyheading: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    marginBottom: 10,
  },
});

export default VerificationScreen;
