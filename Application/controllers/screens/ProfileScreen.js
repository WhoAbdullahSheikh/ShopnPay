import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker'; // Import ImagePicker from 'react-native-image-picker'
import Colors from "../../src/utilities/Color"
function ProfileScreen({ isDarkMode }) {
  const [profilePhoto, setProfilePhoto] = useState(null);

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
  });

  const options = {
    title: 'Select Profile Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setProfilePhoto(response.uri);
      }
    });
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
      <Button title="Save Profile" onPress={() => alert('Profile saved!')} />
    </View>
  );
}

export default ProfileScreen;
