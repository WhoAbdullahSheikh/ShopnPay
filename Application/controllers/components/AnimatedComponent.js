import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';

const AnimatedComponent = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      console.log('Animated value:', value);
    });

    // Start an animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Clean up the listener on unmount
    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [animatedValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animated Value: {animatedValue._value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default AnimatedComponent;
