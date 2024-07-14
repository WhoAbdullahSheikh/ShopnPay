import React, { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [visibleText, setVisibleText] = useState('');

  const textToType = 'Your Next Step to Comfort...'; 

  useEffect(() => {
    const navigateToNextScreen = () => {
      navigation.replace('Login'); // Replace with the name of your next screen
    };

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const typeText = () => {
      let index = 0;
      const interval = setInterval(() => {
        setVisibleText((prevText) => prevText + textToType[index]);
        index += 1;
        if (index === textToType.length) {
          clearInterval(interval);
          setTimeout(navigateToNextScreen, 1500); // Delay the navigation after typing
        }
      }, 50); // Adjust the typing speed (milliseconds per character)
    };

    typeText();

    return () => clearInterval(typeText);
  }, [fadeAnim, navigation, textToType]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']} // Replace with your desired gradient colors
      style={styles.container}>
      <Animated.Image
        source={require('../../../pics/mainlogo.png')} 
        style={{
          ...styles.artwork,
          opacity: fadeAnim,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
        }}
      />
      <View style={styles.bottomTextContainer}>
        <Text style={styles.textWithCursor}>
          {visibleText}
          <Text style={styles.cursor}>|</Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  artwork: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 150, // Adjust the distance from the bottom
  },
  textWithCursor: {
    fontSize: 22,
    color: 'black',
  },
  cursor: {
    fontSize: 21,
    color: 'black',
  },
});

export default SplashScreen;
