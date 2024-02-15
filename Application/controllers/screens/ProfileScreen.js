import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Colors from "../../src/utilities/Color";
import signOutGif from '../../pics/logout.png';

function ProfileScreen({ isDarkMode }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation(); // Initialize useNavigation hook

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
      backgroundColor: isDarkMode ? '#252526' : 'white',
    },
    
    profilePhotoContainer: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      
    },
    profilePhoto: {
      width: '100%',
      height: '100%',
      
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
      color: isDarkMode ? 'white' : 'black',
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
      borderRadius: 100, // Makes the button circular
      padding: 8, // Adjust button padding
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
      width: 30, // Adjust the width and height according to your GIF size
      height: 30,
    },
  });

  const options = {
    title: 'Select Profile Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = () => {
    // Image picker code...
  };

  const handleSignOut = () => {
    navigation.navigate('Login');
  };

  const handleSave = () => {
    // Saving logic...
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.profilePhotoContainer}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <Text style={{ fontSize: 16 }}>Add Profile Photo</Text>
        )}
      </TouchableOpacity>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
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
      <Button title="Save Profile" onPress={handleSave} />
      <View style={styles.signOutButton}>
        <TouchableOpacity onPress={handleSignOut}>
          <Image source={signOutGif} style={styles.signOutGif} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileScreen;
