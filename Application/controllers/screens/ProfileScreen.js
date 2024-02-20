import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from "../../src/utilities/Color";
import signOutGif from '../../pics/logout.png';
import defaultProfileImage from '../../pics/Profile.gif';
import jsonImage from '../../pics/avatar.gif';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
      backgroundColor: 'white',
    },
    profilePhotoContainer: {
      width: 150, // Adjust based on the glow size
      height: 150, // Adjust based on the glow size
      borderRadius: 85, // Half of width and height to make it circular
      backgroundColor: 'transparent', // Set transparent to see the glow effect
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black', // Glow color
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5, // Adjust based on the glow size
    },
    profilePhoto: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
      color: 'black',
    },
    input: {
      marginTop: 20,
      height: 40,
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    signOutButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      borderRadius: 100,
      padding: 8,
      borderColor: 'black',
      borderWidth: 1.5,
      shadowColor: 'black',
      shadowOffset: {
        width: 3,
        height: 2,
      },
      shadowOpacity: 0.6,
    },
    signOutGif: {
      width: 30,
      height: 30,
    },
  });

  const handleSignOut = () => {
    navigation.navigate('Login');
  };

  const handleSave = () => {
    // Saving logic...
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        <Image source={jsonImage} style={styles.profilePhoto} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button
        title="Save"
        onPress={handleSave}
        color={Colors.primary}
      />
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Image source={signOutGif} style={styles.signOutGif} />
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;
