import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== rePassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      const userSession = JSON.parse(await AsyncStorage.getItem('userSession'));
      const userRef = doc(db, 'customers', 'details');
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const users = userSnapshot.data().RegisteredUser;
        const userData = users.find(user => user.phoneNumber === userSession.phoneNumber);

        if (userData) {
          if (userData.password !== currentPassword) {
            Alert.alert('Error', 'Current password is incorrect.');
            return;
          }

          userData.password = newPassword;

          await updateDoc(userRef, {
            RegisteredUser: users,
          });

          Alert.alert('Success', 'Password updated successfully.');
          navigation.goBack();
        } else {
          Alert.alert('Error', 'User not found.');
        }
      } else {
        Alert.alert('Error', 'User data not available.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'There was an error updating the password. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="grey"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="grey"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-enter New Password"
          placeholderTextColor="grey"
          secureTextEntry
          value={rePassword}
          onChangeText={setRePassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A52A2A',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
});

export default ChangePasswordScreen;
